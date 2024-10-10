// for teacher  

import Breadcrumb from '@/components/Breadcrumb';
import CompanySidebar from '@/components/CompanySidebar';
import HeaderInternal from '@/components/HeaderInternal';
import InternalContainer from '@/components/InternalContainer';
import TeacherSidebar from '@/components/TeacherSidebar';
import React from 'react'

function ImtahanlarSiyahisi() {
    return (
        <>
          <HeaderInternal />
          <div className="flex">
            <div className="w-[20%]">
              <TeacherSidebar />
            </div>
    
            <div className="w-[80%]">
              <InternalContainer>
                <Breadcrumb />
    
               
    
              
              </InternalContainer>
            </div>
          </div>
    
        
        </>
      );
}

export default ImtahanlarSiyahisi