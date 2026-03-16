'use client';

import ServiceCreate from './create/ServiceCreate';

const Services = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <ServiceCreate />
          </div>
          <div className="col-span-2">dd</div>
        </div>
      </div>
    </section>
  );
};

export default Services;
