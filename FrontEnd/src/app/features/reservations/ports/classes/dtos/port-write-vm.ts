export interface PortWriteDto {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    stopOrder: number
    isActive: boolean
    // Rowversion
    putAt: string

}
