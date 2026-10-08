import { APP_NAME, CONTACT_EMAIL } from '@/shared/config'
import { usePageMeta } from '@/shared/lib'
import { DocPage } from '@/shared/ui'

const PRIVACY_EFFECTIVE_DATE = '2026년 10월 8일'

export function PrivacyPage() {
  usePageMeta({
    title: `개인정보처리방침 | ${APP_NAME}`,
    description: `${APP_NAME} 의 개인정보 처리 목적, 수집 항목, 쿠키 및 광고 관련 안내입니다.`,
    path: '/privacy',
  })

  return (
    <DocPage eyebrow="Policy" title="개인정보처리방침" updatedAt={PRIVACY_EFFECTIVE_DATE}>
      <p>
        {APP_NAME}(이하 "서비스")는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과
        같이 개인정보처리방침을 수립·공개합니다.
      </p>

      <h2>1. 처리하는 개인정보 항목 및 수집 방법</h2>
      <p>
        서비스는 <strong>회원가입 기능이 없으며</strong>, 이름·연락처 등 이용자를 직접 식별할 수 있는 정보를 입력받지
        않습니다. 다만 서비스 이용 과정에서 아래 정보가 자동으로 생성·수집될 수 있습니다.
      </p>
      <table>
        <thead>
          <tr>
            <th>항목</th>
            <th>수집 주체 · 방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>접속 IP, 접속 일시, 브라우저·기기 정보, 요청 URL</td>
            <td>호스팅 사업자(Vercel)의 서버 로그로 자동 기록</td>
          </tr>
          <tr>
            <td>방문 페이지, 체류 시간, 유입 경로, 대략적 지역 등 이용 통계</td>
            <td>Google Analytics 쿠키를 통해 자동 수집</td>
          </tr>
          <tr>
            <td>광고 노출·클릭 정보, 광고 식별자</td>
            <td>Google AdSense 및 제3자 광고 사업자 쿠키를 통해 자동 수집</td>
          </tr>
          <tr>
            <td>안내 팝업 "오늘 하루 보지 않기" 설정값</td>
            <td>이용자 브라우저의 로컬 저장소(localStorage)에만 저장되며 서버로 전송되지 않음</td>
          </tr>
          <tr>
            <td>이메일 주소 및 문의 내용</td>
            <td>이용자가 문의 메일을 보내는 경우에 한함</td>
          </tr>
        </tbody>
      </table>

      <h2>2. 개인정보의 처리 목적</h2>
      <ul>
        <li>서비스 제공 및 안정적인 운영, 장애·부정 이용 대응</li>
        <li>이용 통계 분석을 통한 서비스 개선</li>
        <li>광고 게재 및 광고 성과 측정</li>
        <li>이용자 문의에 대한 답변</li>
      </ul>

      <h2>3. 보유 및 이용 기간</h2>
      <ul>
        <li>서버 접속 로그: 호스팅 사업자의 보관 정책에 따름</li>
        <li>Google Analytics 데이터: 수집일로부터 최대 14개월</li>
        <li>광고 쿠키: 각 광고 사업자의 정책에 따름 (이용자가 언제든 삭제 가능)</li>
        <li>문의 메일: 답변 완료 후 1년 이내 파기</li>
      </ul>

      <h2>4. 개인정보의 제3자 제공</h2>
      <p>
        서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 근거가 있거나 수사기관의 적법한 요청이 있는
        경우는 예외로 합니다.
      </p>

      <h2>5. 개인정보 처리의 위탁 및 국외 이전</h2>
      <p>서비스 운영을 위해 아래 사업자의 서비스를 이용하며, 이 과정에서 정보가 국외 서버에 저장·처리될 수 있습니다.</p>
      <table>
        <thead>
          <tr>
            <th>수탁자</th>
            <th>위탁 업무</th>
            <th>이전 국가</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel Inc.</td>
            <td>웹사이트 호스팅, 서버 로그 처리</td>
            <td>미국 등 (서울 리전 포함)</td>
          </tr>
          <tr>
            <td>Google LLC</td>
            <td>이용 통계 분석(Google Analytics), 광고 게재(Google AdSense)</td>
            <td>미국 등</td>
          </tr>
        </tbody>
      </table>

      <h2>6. 쿠키 및 광고에 관한 안내</h2>
      <p>
        서비스는 이용 통계 분석과 광고 게재를 위해 쿠키(cookie)를 사용합니다. 쿠키는 웹사이트가 이용자의 브라우저에 저장하는
        작은 텍스트 파일입니다.
      </p>
      <ul>
        <li>
          Google 을 포함한 제3자 광고 사업자는 쿠키를 사용하여 이용자의 본 사이트 및 다른 웹사이트 방문 기록을 바탕으로
          광고를 게재합니다.
        </li>
        <li>
          Google 은 광고 쿠키를 사용하여 이용자의 본 사이트 및 인터넷상 다른 사이트 방문 기록에 기반한 광고를 이용자에게
          게재할 수 있습니다.
        </li>
        <li>
          이용자는{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google 광고 설정
          </a>
          에서 맞춤 광고를 사용 중지할 수 있으며,{' '}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
            www.aboutads.info
          </a>
          에서 제3자 광고 사업자의 맞춤 광고용 쿠키 사용을 거부할 수 있습니다.
        </li>
        <li>
          Google 의 데이터 사용 방식은{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            Google 파트너 사이트 데이터 사용 정책
          </a>
          에서 확인할 수 있습니다.
        </li>
      </ul>
      <h3>쿠키 저장을 거부하는 방법</h3>
      <p>
        브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다. (예: Chrome → 설정 → 개인정보 및 보안 → 서드 파티 쿠키)
        쿠키 저장을 거부해도 서비스의 주요 기능은 이용할 수 있으나, 일부 맞춤 광고가 제공되지 않을 수 있습니다.
      </p>

      <h2>7. 개인정보의 파기</h2>
      <p>
        보유 기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는 방법으로
        삭제합니다.
      </p>

      <h2>8. 정보주체의 권리와 행사 방법</h2>
      <p>
        이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요구할 수 있으며, 아래 연락처로 요청하시면 지체 없이
        조치하겠습니다.
      </p>

      <h2>9. 개인정보의 안전성 확보 조치</h2>
      <ul>
        <li>모든 통신은 HTTPS 로 암호화합니다.</li>
        <li>서비스는 이용자의 개인정보를 별도의 데이터베이스에 저장하지 않습니다.</li>
      </ul>

      <h2>10. 개인정보 보호책임자</h2>
      <ul>
        <li>담당: {APP_NAME} 운영자</li>
        <li>
          이메일: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
      </ul>
      <p>
        기타 개인정보 침해에 대한 신고나 상담은 개인정보침해신고센터(privacy.kisa.or.kr / 국번 없이 118),
        개인정보분쟁조정위원회(www.kopico.go.kr / 1833-6972)에 문의할 수 있습니다.
      </p>

      <h2>11. 개인정보처리방침의 변경</h2>
      <p>이 방침은 {PRIVACY_EFFECTIVE_DATE}부터 적용되며, 내용이 변경되는 경우 시행 7일 전부터 이 페이지를 통해 공지합니다.</p>
    </DocPage>
  )
}
