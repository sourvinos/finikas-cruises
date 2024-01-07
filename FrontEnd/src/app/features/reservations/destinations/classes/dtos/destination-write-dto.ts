export interface DestinationWriteDto {

    // PK
    id: number
    abbreviation: string
    description: string
    isPassportRequired: boolean
    isActive: boolean
    // Rowversion
    putAt: string

}
