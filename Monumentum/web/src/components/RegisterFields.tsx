import type { RegisterCredentials } from '../types/api'

type Identity = Pick<RegisterCredentials, 'nom' | 'prenom' | 'pseudo'>

interface RegisterFieldsProps {
  value: Identity
  onChange: (value: Identity) => void
  disabled: boolean
}

const fields = [
  { name: 'prenom', label: 'Prénom', autoComplete: 'given-name' },
  { name: 'nom', label: 'Nom', autoComplete: 'family-name' },
  { name: 'pseudo', label: 'Pseudo', autoComplete: 'nickname' },
] as const

function RegisterFields({ value, onChange, disabled }: RegisterFieldsProps) {
  return (
    <>
      {fields.map((field) => (
        <div className="auth-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type="text"
            autoComplete={field.autoComplete}
            value={value[field.name]}
            onChange={(event) =>
              onChange({ ...value, [field.name]: event.target.value })
            }
            disabled={disabled}
            required
          />
        </div>
      ))}
    </>
  )
}

export default RegisterFields