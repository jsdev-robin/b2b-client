'use client';

import ServiceCreate from './create/ServiceCreate';
import ServiceList from './list/ServiceList';

const Services = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ServiceCreate />
          </div>
          <div className="lg:col-span-2">
            <ServiceList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
