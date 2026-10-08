// Vercel Function: /binance/* → https://fapi.binance.com/* 프록시
// - vercel.json 의 regions(icn1, 서울)에서 실행 → 미국 리전 IP 차단(451) 회피
// - 공개 시세 엔드포인트만 허용해 오픈 프록시로 악용되지 않게 한다
// - CDN 캐시(s-maxage)로 사용자 수와 무관하게 Binance 호출 수를 제한한다

const UPSTREAM = 'https://fapi.binance.com'

const ALLOWED_PATHS = [
  'fapi/v1/klines',
  'fapi/v1/ticker/24hr',
  'futures/data/globalLongShortAccountRatio',
  'futures/data/topLongShortPositionRatio',
  'futures/data/takerlongshortRatio',
  'futures/data/openInterestHist',
]

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const path = (url.searchParams.get('path') ?? '').replace(/^\/+/, '')
  url.searchParams.delete('path')

  if (!ALLOWED_PATHS.includes(path)) {
    return Response.json({ error: 'Not allowed' }, { status: 403 })
  }

  try {
    const upstream = await fetch(`${UPSTREAM}/${path}?${url.searchParams.toString()}`, {
      headers: { accept: 'application/json' },
    })
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') ?? 'application/json',
        'cache-control': upstream.ok ? 'public, s-maxage=10, stale-while-revalidate=30' : 'no-store',
      },
    })
  } catch {
    return Response.json({ error: 'Upstream request failed' }, { status: 502 })
  }
}
