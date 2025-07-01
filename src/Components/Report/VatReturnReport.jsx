import React, { useState } from 'react'
import { FilterSideBar } from '../../Shared/FilterSideBar';
import { ShareInput } from '../../Shared/ShareInput';
import * as Yup from 'yup';
import { Button } from 'primereact/button';

export function VatReturnReport() {
      const [visible, setVisible] = useState(false);

  const initialValues = {
    start_date: "",
    end_date: "",
  };

  const validationSchema = Yup.object({
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("Filtered:", values);
    setVisible(false);
  };

    return (
        <React.Fragment>
            
             <Button
        icon="pi pi-filter"
        label="Filter"
        onClick={() => setVisible(true)}
      />

      <FilterSideBar 
      visible={visible}
        onHide={() => setVisible(false)}
        title="Trial Balance Filter"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div>
                <ShareInput name="start_date" label='Start Date' type='date'/>
            </div>
            <div>
                <ShareInput name='end_date' label='End Date' type='date'/>
            </div>
      </FilterSideBar>
        </React.Fragment>
    )
}
