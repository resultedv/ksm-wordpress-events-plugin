import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, FormControl, InputLabel } from "@mui/material";
import { useContext } from "react";
import AppContext from "./AppContext";
import { useRest } from "../hooks/useRest";

export default function CheckboxFilter( {metaKey, label}) {
    const { getFilter, setFilter, restUrl } = useContext( AppContext );

    const optionData = useRest( restUrl + 'ksm/v1/meta/' + metaKey, {}, [] );

    let options = {};
    if (
        optionData !== null &&
        ! ( optionData instanceof Error ) &&
        optionData.body.length > 0
    ) {
        optionData.body.forEach( m => {
            options[m] = m;
        } );
    }

    const checked = getFilter( 'meta_' + metaKey, true ) || [];
    const setChecked = value => setFilter( 'meta_' + metaKey, value );

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={'ksm-checkbox-filter-label--' + metaKey}>{label}</InputLabel>
            <Select
                variant="outlined"
                id={'ksm-checkbox-filter--' + metaKey}
                labelId={'ksm-checkbox-filter-label--' + metaKey}
                multiple
                input={<OutlinedInput label={label} sx={{ borderRadius: 0 }} />}
                value={checked}
                onChange={ e => {
                    const v = e.target.value;
                    if ( v.includes( 'select-all' ) || v.length === Object.keys( options ).length ) {
                        setChecked( [] );
                    } else {
                        setChecked( v );
                    }
                } }
                renderValue={
                    s => optionData !== null
                        ? (
                            s.length === Object.keys( options ).length
                            ? 'Alle anzeigen'
                            : s.map( v => options[v] ).filter( v => v !== undefined ).join( ', ' )
                        )
                        : 'Alle anzeigen'
                }
            >
                <MenuItem value="select-all">
                    <Checkbox
                        checked={checked.length === 0}
                    />
                    <ListItemText primary="Alle auswählen" />
                </MenuItem>
                {Object.keys(options).map(value => (
                    <MenuItem key={value} value={value}>
                        <Checkbox checked={checked.includes(value)} />
                        <ListItemText primary={options[value]} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}