import { Link } from 'react-router-dom'
import { APP_NAME, CONTACT_EMAIL } from '@/shared/config'

export function AboutEn() {
  return (
    <>
      <p>
        {APP_NAME} is a free analysis tool that splits the perpetual futures markets of major coins such as Bitcoin and
        Ethereum into <strong>5m · 15m · 1H · 4H · 1D</strong> timeframes and shows, as a probability, whether the long
        (up) or short (down) trend is dominant on each one. On the same screen you can also check real traders' long/short
        ratios and the price levels where liquidations are clustered.
      </p>

      <h2>Why look at each timeframe separately?</h2>
      <p>
        At the same moment, the 5m chart can be falling while the 4H chart is rising. Short-term traders should focus on
        shorter candles and swing traders on longer ones, but the more timeframes point the same way, the more consistent the
        signal. The "Overall trend" at the top gives more weight to higher timeframes (5m 10%, 15m 15%, and 25% each for 1H,
        4H and 1D).
      </p>

      <h2>How is the trend probability calculated?</h2>
      <p>
        For each timeframe, the latest 500 candles are used to compute the eight indicators below. Each indicator is scored
        from −1 (short) to +1 (long), and the weighted sum is converted into a probability.
      </p>
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Weight</th>
            <th>What it measures</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMA 20 / 50 / 200 alignment</td>
            <td>20%</td>
            <td>The order of short-, mid- and long-term moving averages, which indicates the broad trend direction.</td>
          </tr>
          <tr>
            <td>EMA50 slope</td>
            <td>10%</td>
            <td>How steeply the mid-term moving average is moving (trend speed).</td>
          </tr>
          <tr>
            <td>MACD histogram</td>
            <td>15%</td>
            <td>The direction of momentum and whether it is accelerating or slowing.</td>
          </tr>
          <tr>
            <td>RSI(14)</td>
            <td>10%</td>
            <td>Whether buyers or sellers have the upper hand, relative to 50.</td>
          </tr>
          <tr>
            <td>DMI / ADX</td>
            <td>15%</td>
            <td>Direction from +DI and −DI, and trend strength from ADX.</td>
          </tr>
          <tr>
            <td>Supertrend (10, 3)</td>
            <td>15%</td>
            <td>Trend reversals based on volatility (ATR).</td>
          </tr>
          <tr>
            <td>Market structure</td>
            <td>10%</td>
            <td>Whether swing highs and lows are rising (HH/HL) or falling (LH/LL).</td>
          </tr>
          <tr>
            <td>OBV</td>
            <td>5%</td>
            <td>Whether volume confirms the price move.</td>
          </tr>
        </tbody>
      </table>
      <p>
        A long probability of 60% or more is shown as <strong>Long bias</strong>, 40% or less as <strong>Short bias</strong>,
        and anything in between is treated as directionless and shown as <strong>Wait &amp; see</strong>. When ADX is below
        20 the trend itself is weak, so a "Ranging" tag is added.
      </p>

      <h2>What are the long/short ratios?</h2>
      <p>We show three ratios published for Binance USDT perpetual futures.</p>
      <ul>
        <li>
          <strong>All accounts</strong>: the number of accounts holding long positions versus short positions. Closest to
          retail sentiment.
        </li>
        <li>
          <strong>Top trader positions</strong>: the position size ratio of the top 20% of accounts by margin. Useful for
          gauging where large players lean.
        </li>
        <li>
          <strong>Taker buy/sell</strong>: the ratio of market-order buy and sell volume. Shows which side is currently more
          aggressive.
        </li>
      </ul>
      <p>
        Prices often fall when retail accounts are overwhelmingly long, so use these ratios to cross-check the trend
        probability rather than on their own.
      </p>

      <h2>How is the liquidation map built?</h2>
      <p>
        Exchanges do not publish individual liquidation prices. Instead, every hour {APP_NAME} treats any increase in open
        interest (OI) as newly opened positions and estimates their liquidation levels assuming a leverage mix (10x 30% · 25x
        30% · 50x 25% · 100x 15%). Once price trades through a level, those positions are treated as already liquidated and
        removed.
      </p>
      <p>
        Short liquidation clusters above the current price and long clusters below it are often cited as levels price tends
        to gravitate toward, but please remember they are estimates.
      </p>

      <h2>Data sources</h2>
      <ul>
        <li>Charts: TradingView</li>
        <li>Candles · prices · long/short ratios · open interest: Binance USDT-M Futures public API</li>
      </ul>
      <p>Data refreshes automatically every 30 seconds to 5 minutes depending on the timeframe.</p>

      <h2>Operating principles</h2>
      <ul>
        <li>We do not run exchange referral codes, paid memberships or signal groups.</li>
        <li>Anyone can use the service for free without signing up. Running costs are covered by advertising.</li>
        <li>Nothing here is investment advice. All investment decisions and their consequences are your own.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Send bug reports or suggestions to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. For details, see the{' '}
        <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </>
  )
}
