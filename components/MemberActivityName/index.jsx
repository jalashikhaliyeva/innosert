import React from "react";

function MemberActivityName({memberActivitySingle}) {
  console.log(memberActivitySingle, "memberActivitySingle");
  
  return (
    <div className="flex justify-between relative font-gilroy mb-6">
      <h1 className="text-2xl font-medium leading-8">Üzv {memberActivitySingle}</h1>
    </div>
  );
}

export default MemberActivityName;
