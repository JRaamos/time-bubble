import React, { useMemo } from "react";  

import {  
    Badge,
    BadgeRemove,
    BadgePoll,
    BadgeRemoveIcon,
    BadgeText,
} from "./styled";

export default function DashboardFormSelectPool({ selected, options, onRemove }){  

    const safeRemove = item => {
        if(onRemove && typeof onRemove === 'function'){ onRemove(item) ;}
    }

    const nextOptions = useMemo(() => {
        return typeof selected?.map === 'function' ? selected : []
    }, [selected])
    
    return ( 
        <>
            <BadgePoll>
                {
                    (nextOptions||[])?.map((m, k) => 
                        <Badge key={k}>
                            <BadgeText>
                                { (options || [])?.find(f => `${f.id}` === m )?.title }
                            </BadgeText>
                            <BadgeRemove onPress={() => safeRemove(m)}>
                                <BadgeRemoveIcon />
                            </BadgeRemove>
                        </Badge>
                    )
                }
            </BadgePoll>
        </>
    );
}