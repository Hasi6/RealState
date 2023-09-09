import { FC, useState } from 'react';
import { Button, Group } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import ModalContainer from '@/components/templates/ModalContainer';
import FormContainer from '@/containers/Form';
import { API_ROUTES, HTTP_TYPES } from '@/utils/constants';
import {
  PropertyLocation,
  PropertyStatus,
  PropertyType,
  propertyCreateSchema,
  PropertyCreateSchema
} from '@/models/property';
import ImagePicker from '@/components/molecules/ImagePicker';

interface Props {
  id?: string;
  initialValues?: PropertyCreateSchema;
  isEdit?: boolean;
  onAfterSuccess: () => void;
  icon?: React.ReactNode;
}

const PropertyModal: FC<Props> = ({
  id,
  initialValues,
  isEdit,
  onAfterSuccess,
  icon
}) => {
  const [open, setOpen] = useState(false);

  const generateUISchema = (): FormContainer.UISchema[] => {
    return [
      {
        field: 'component',
        id: 'image',
        render: (
          form: UseFormReturnType<object, (values: object) => object>
          // @ts-ignore
        ) => <ImagePicker alt="location" url={form.values.image} form={form} />
      },
      {
        field: 'input',
        id: 'title',
        helperText: 'Title',
        label: 'Title*',
        placeHolder: 'Title',
        type: 'text'
      },
      {
        field: 'textarea',
        id: 'description',
        helperText: 'Description',
        label: 'Description*',
        placeHolder: 'Description'
      },
      {
        field: 'input',
        id: 'slug',
        helperText: 'Slug',
        label: 'Slug*',
        placeHolder: 'Slug',
        type: 'text'
      },
      {
        field: 'input',
        id: 'price',
        helperText: 'Price',
        label: 'Price*',
        placeHolder: 'Price',
        type: 'number'
      },
      {
        field: 'input',
        id: 'areaSqFt',
        helperText: 'SqFt',
        label: 'SqFt*',
        placeHolder: 'SqFt',
        type: 'number'
      },
      {
        field: 'select',
        id: 'location',
        helperText: 'Location',
        label: 'Location*',
        placeHolder: 'Location',
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
        field: 'select',
        id: 'status',
        helperText: 'Status',
        label: 'Status*',
        placeHolder: 'Status',
        options: [PropertyStatus.Rent, PropertyStatus.Sale].map((location) => ({
          label: location,
          value: location
        }))
      },
      {
        field: 'select',
        id: 'type',
        helperText: 'Type',
        label: 'Type*',
        placeHolder: 'Type',
        options: [PropertyType.SingleFamily, PropertyType.Villa].map(
          (location) => ({
            label: location,
            value: location
          })
        )
      }
    ];
  };

  const handleBeforeSubmit = (data: PropertyCreateSchema) => {
    return {
      areaSqFt: parseInt(data.areaSqFt),
      description: data.description,
      image: data.image,
      location: data.location,
      price: parseInt(data.price),
      slug: data.slug,
      status: data.status,
      title: data.title,
      type: data.type
    };
  };

  const handleSuccess = () => {
    onAfterSuccess();
    setOpen(false);
  };

  return (
    <>
      {open && (
        <ModalContainer
          onClose={() => setOpen(false)}
          title="Create New Location"
        >
          <FormContainer
            initialValues={
              initialValues ?? {
                title: '',
                description: '',
                areaSqFt: 0,
                location: '',
                image: '',
                price: 0,
                slug: '',
                status: '',
                type: ''
              }
            }
            method={isEdit ? HTTP_TYPES.PUT : HTTP_TYPES.POST}
            onBeforeSubmit={handleBeforeSubmit}
            onSuccess={handleSuccess}
            isEdit={isEdit}
            schema={propertyCreateSchema}
            uiSchema={generateUISchema()}
            url={
              isEdit
                ? `${API_ROUTES.LOCATION.BASE}/${id}`
                : API_ROUTES.LOCATION.BASE
            }
          />
        </ModalContainer>
      )}
      <Group position="right">
        <Button className="bg-blue-500" onClick={() => setOpen(true)}>
          {icon ?? 'New Location'}
        </Button>
      </Group>
    </>
  );
};

export default PropertyModal;
