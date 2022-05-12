export const defaultStyle : any = {
    select: (provided : any, state : any) : any => ({
        ...provided,
        width: "100px",
        backgroundColor:"red"
    }),
    menu: (provided : any, state : any) : any => ({
        ...provided,
        backgroundColor:"blue"

    }),
    option: (provided : any, state : any) : any => ({
        ...provided,
        backgroundColor:"cyan"

      }),
    control: (provided : any, state : any) => ({
        ...provided,

    }),
    singleValue: (provided : any, state : any) => {
    return { ...provided ,color: "red",display:"inline"};
    }
}