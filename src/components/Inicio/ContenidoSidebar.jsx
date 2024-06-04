import React, { useContext } from "react";
import { PrincipalContext } from "@/context/PrincipalContext";
import { SplitButton } from "primereact/splitbutton";

export const ContenidoSidebarSize = ({ label }) => {
    const { itemsRes, itemsSize, size, p } = useContext(PrincipalContext)

    return (<React.Fragment>
        <SplitButton
            //label={ayuda[size]}
            //icon="pi pi-cog"
            label={label}
            model={itemsSize}
            text
            dropdownIcon={p("pi pi-table", size)}
            tooltip="Tamaño de la Tabla"
            tooltipOptions={{ position: "bottom" }}
        />
    </React.Fragment>)
}
export const ContenidoSidebarResponsive = ({ label }) => {
    const { itemsRes, itemsSize, size, p } = useContext(PrincipalContext)

    return (<React.Fragment>
        <SplitButton
            label={label}
            model={itemsRes}
            text
            dropdownIcon={p("pi pi-cog", size)}
            tooltip="Tabla Responsiva?"
            tooltipOptions={{ position: "bottom" }}

        />
    </React.Fragment>)
}