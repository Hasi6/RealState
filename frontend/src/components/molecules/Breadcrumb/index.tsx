import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

namespace HAuthBreadcrumbNS {
  export interface Link {
    title: string;
    to: string;
  }
}

interface Props {
  links: HAuthBreadcrumbNS.Link[];
}

const HAuthBreadcrumb: FC<Props> = ({ links }) => {
  const items = links.map((item, index) => (
    <Link href={item.to} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
    </>
  );
};

export default HAuthBreadcrumb;
