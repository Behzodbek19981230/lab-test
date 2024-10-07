/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */

'use server'

import { db as invoiceData } from '@/fake-db/apps/invoice'

import { db as documentData } from '@/fake-db/apps/document'
import { db as productData } from '@/fake-db/apps/product'
import { db as testproductData } from '@/fake-db/apps/testproduct'

export const getInvoiceData = async () => {
  return invoiceData
}

export const getDocumentData = async () => {
  return documentData
}

export const getProductData = async () => {
  return productData
}

export const getTestProductData = async () => {
  return testproductData
}
