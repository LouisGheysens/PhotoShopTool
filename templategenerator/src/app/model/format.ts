export enum FormatEnum {
    JPEG= "JPEG",
    PNG = "PNG"
}

export const FileType2LabelMapping: Record<FormatEnum, string> = {
    [FormatEnum.JPEG]: "JPEG",
    [FormatEnum.PNG]: "PNG",
};
