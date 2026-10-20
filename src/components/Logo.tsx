type LogoProps = { className?: string }

/**
 * Marchio testuale dell'intestazione.
 * Due parti con due ruoli: la sigla porta il peso, il suffisso la
 * precisione. Nel piè di pagina non si usa questo: lì c'è il marchio
 * vero, `public/img/logo-crmlab.png`.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={className ? `logo ${className}` : 'logo'}>
      <span className="logo__mark" aria-hidden="true">
        CRM
      </span>
      <span className="logo__sub" aria-hidden="true">
        LAB
      </span>
      <span className="visually-hidden">CRM LAB</span>
    </span>
  )
}
