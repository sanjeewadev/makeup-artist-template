import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { R2ClientUploadHandler as R2ClientUploadHandler_85cc02ed84006fcc91d3aff39dda669d } from '@payloadcms/storage-r2/client'
import { AdminIcon as AdminIcon_studio } from '../../../components/payload/AdminIcon'
import { AdminLogo as AdminLogo_studio } from '../../../components/payload/AdminLogo'
import { DashboardWelcome as DashboardWelcome_studio } from '../../../components/payload/DashboardWelcome'

/** @type import('payload').ImportMap */
export const importMap = {
  '@payloadcms/next/rsc#CollectionCards': CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  '@payloadcms/storage-r2/client#R2ClientUploadHandler':
    R2ClientUploadHandler_85cc02ed84006fcc91d3aff39dda669d,
  '/components/payload/AdminIcon#AdminIcon': AdminIcon_studio,
  '/components/payload/AdminLogo#AdminLogo': AdminLogo_studio,
  '/components/payload/DashboardWelcome#DashboardWelcome': DashboardWelcome_studio,
}
