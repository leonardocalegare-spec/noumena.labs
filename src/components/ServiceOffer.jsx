import Icon from './Icon.jsx'
import { formatServicePrice } from '../utils/serviceOffers.js'

export function ServicePrice({ price }) {
  return <span className="service-price">{formatServicePrice(price)}</span>
}

export default function ServiceOffer({ offer, isPackage = false }) {
  const conditions = (
    <>
      <p>{offer.conditions}</p>
      <p>{offer.externalCosts}</p>
    </>
  )
  const content = (
    <div className="service-offer-body">
      <p className="service-offer-description">{offer.description}</p>
      <ul className="service-includes">
        {offer.includes.map((item) => (
          <li key={item}>
            <Icon name="check" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {isPackage ? (
        <div className="service-conditions">{conditions}</div>
      ) : (
        <details className="service-conditions">
          <summary>
            Condições e custos <Icon name="plus" size={16} />
          </summary>
          {conditions}
        </details>
      )}
      <a className="button service-offer-contact" href={offer.href} target="_blank" rel="noreferrer">
        <span>{offer.cta}</span>
        <Icon name="arrow" size={17} />
      </a>
    </div>
  )

  if (isPackage) {
    return (
      <details className="service-package">
        <summary>
          <span>
            <span className="service-package-title">{offer.title}</span>
            <ServicePrice price={offer.price} />
          </span>
          <Icon name="plus" size={18} />
        </summary>
        {content}
      </details>
    )
  }

  return (
    <article className="service-offer" aria-labelledby={`offer-${offer.id}`}>
      <h4 id={`offer-${offer.id}`}>{offer.title}</h4>
      <ServicePrice price={offer.price} />
      {content}
    </article>
  )
}
