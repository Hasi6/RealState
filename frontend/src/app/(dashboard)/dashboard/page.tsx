'use client';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { compose } from 'lodash/fp';
import { Image } from '@mantine/core';

import TableContainer from '@/containers/Table';
import { useQuery } from '@/hooks/useQuery';
import {
  PropertyZ,
  PropertyLocation,
  PropertyStatus,
  PropertyType
} from '@/models/property';
import { API_ROUTES, HTTP_TYPES, MESSAGES } from '@/utils/constants';
import ConfirmModal from '@/components/organisms/ConfirmModal';
import { useMutation } from '@/hooks/useMutate';
import { notifications } from '@mantine/notifications';
import FilterPanel, { Filters } from '@/containers/FilterPanel';
import { withFilters } from '@/components/hoc/withFilters/withFilters';
import PropertyModal from '@/components/molecules/PropertyModal';
import ButtonContainer from '@/components/atoms/Button';

const generateFilterSchema = (): Filters.Filter[] => {
  return [
    {
      id: 'title',
      label: 'Title',
      type: 'input'
    },
    {
      id: 'location',
      label: 'Location',
      type: 'select',
      options: [
        PropertyLocation.Colombo,
        PropertyLocation.Galle,
        PropertyLocation.Kandy
      ].map((location) => ({
        label: location,
        value: location
      }))
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [PropertyStatus.Rent, PropertyStatus.Sale].map((status) => ({
        label: status,
        value: status
      }))
    },
    {
      id: 'type',
      label: 'Type',
      type: 'select',
      options: [PropertyType.SingleFamily, PropertyType.Villa].map((type) => ({
        label: type,
        value: type
      }))
    }
  ];
};

function Dashboard() {
  const { data, loading, meta, retry } = useQuery<PropertyZ[]>({
    url: `${API_ROUTES.LOCATION.BASE}`
  });

  const { mutate, loading: deleteLoading } = useMutation({
    url: API_ROUTES.LOCATION.BASE
  });

  const generateColumn = (): TableContainer.Column<PropertyZ>[] => {
    return [
      {
        id: 'image',
        label: 'Image',
        render: (attributes) => (
          <Image
            className="cursor-pointer"
            maw={80}
            radius="md"
            src={attributes.image}
            alt={attributes.title}
          />
        )
      },
      {
        id: 'title',
        label: 'Title'
      },
      {
        id: 'slug',
        label: 'Slug'
      },
      {
        id: 'location',
        label: 'Location'
      },
      {
        id: 'description',
        label: 'Description'
      },
      {
        id: 'price',
        label: 'Price'
      },
      {
        id: 'type',
        label: 'Type'
      },
      {
        id: 'status',
        label: 'Status'
      },
      {
        id: 'areaSqFt',
        label: 'SqFt'
      },
      {
        id: 'actions',
        render: ({ _id, ...rest }) => {
          return (
            <div className="flex">
              <PropertyModal
                onAfterSuccess={retry}
                icon={<AiOutlineEdit className="mx-[10px] cursor-pointer" />}
                initialValues={{
                  ...rest,
                  price: String(rest.price),
                  areaSqFt: String(rest.areaSqFt)
                }}
                id={_id}
                isEdit={true}
              />

              <ConfirmModal
                description="Are you sure you want to delete this location? this actions can't be undone."
                iconButton={
                  <ButtonContainer className="bg-red-500 hover:bg-red-600 mx-[10px]">
                    <FiTrash className="text-white cursor-pointer" />
                  </ButtonContainer>
                }
                loading={deleteLoading}
                onConfirm={() => handleDeleteLocation(_id)}
                title={`Delete ${rest.title}?`}
              />
            </div>
          );
        }
      }
    ];
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      const res = await mutate(
        {},
        HTTP_TYPES.DELETE,
        {},
        `${API_ROUTES.LOCATION.BASE}/${id}`
      );

      if (res.success) {
        notifications.show({
          title: 'success',
          message: MESSAGES.OPERATION_SUCCESS
        });
        return retry();
      }

      notifications.show({
        title: 'success',
        message: MESSAGES.SOME_THING_WENT_WRONG,
        color: 'red'
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'success',
        message: MESSAGES.SOME_THING_WENT_WRONG,
        color: 'red'
      });
    }
  };

  return (
    <div className="pt-0">
      <PropertyModal onAfterSuccess={retry} />
      <FilterPanel filters={generateFilterSchema()} />
      <TableContainer
        columns={generateColumn()}
        data={data || []}
        loading={loading}
        meta={meta}
      />
    </div>
  );
}

export default compose(withFilters)(Dashboard);
