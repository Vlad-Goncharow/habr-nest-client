export interface SelectOption {
  value: string
  label: string
}

export interface ValuesType {
  fullName: string
  description: string
  dateOfBirth: Date | string
  gender: SelectOption
  country: SelectOption
}
