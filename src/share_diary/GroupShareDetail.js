import { useState } from "react";
import GroupShareDetailEach from "./GroupShareDetailEach";

const GroupShareDetail = ({ name, match }) => {

    const { shareroomId, createdDt } = match.params;
    return (
        <>
            <GroupShareDetailEach shareroomId={ shareroomId } createdDt={ createdDt }/>
            <GroupShareDetailEach shareroomId={ shareroomId } createdDt={ createdDt }/>
        </>
    );
}

export default GroupShareDetail;