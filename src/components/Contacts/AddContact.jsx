import { useContext, useState } from 'react';

import { ContactContext } from '../../context/contactContext';

import { Link } from 'react-router'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '../../validations/contactValidation';

import Spinner from '../Spinner';

const AddContact = () => {
    const { loading, groups, createContact } = useContext(ContactContext);
    const [previewImage, setPreviewImage] = useState(null);

    // تولید آواتار متنی بر اساس نام
    const generateAvatar = (name) => {
        if (!name) return '?';
        const initials = name.split(' ').map(n => n[0]).join('');
        return initials.substring(0, 2);
    };

    // رنگ‌های مختلف برای آواتار
    const avatarColors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-pink-500',
        'bg-indigo-500'
    ];

    // انتخاب رنگ بر اساس نام
    const getAvatarColor = (name) => {
        if (!name) return avatarColors[0];
        const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return avatarColors[charCodeSum % avatarColors.length];
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <section className="py-8">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                            <div className="px-6 py-8 sm:px-10 sm:py-10">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                        افزودن مخاطب جدید
                                    </h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        اطلاعات مخاطب جدید خود را وارد کنید
                                    </p>
                                </div>

                                <Formik
                                    initialValues={{
                                        fullname: '',
                                        mobile: '',
                                        email: '',
                                        group: '',
                                        job: '',
                                        image: ''
                                    }}
                                    validationSchema={contactSchema}
                                    onSubmit={async (values) => {
                                        await createContact(values);
                                    }}
                                >
                                    {({ setFieldValue, values }) => (
                                        <Form className="mt-8 space-y-6">
                                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-6">
                                                    <div className="flex items-center justify-center">
                                                        {values.image ? (
                                                            <img 
                                                                className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 object-cover" 
                                                                src={values.image} 
                                                                alt="پیش‌نمایش" 
                                                            />
                                                        ) : (
                                                            <div className={`${getAvatarColor(values.fullname)} h-24 w-24 rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                                                                {generateAvatar(values.fullname)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="sm:col-span-6">
                                                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        نام و نام خانوادگی
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            type="text"
                                                            id="fullname"
                                                            name="fullname"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        />
                                                        <ErrorMessage name="fullname" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        شماره موبایل
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            type="tel"
                                                            id="mobile"
                                                            name="mobile"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        />
                                                        <ErrorMessage name="mobile" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        آدرس ایمیل
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        />
                                                        <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="job" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        شغل
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            type="text"
                                                            id="job"
                                                            name="job"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        />
                                                        <ErrorMessage name="job" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        گروه
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            as="select"
                                                            id="group"
                                                            name="group"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        >
                                                            <option value="">انتخاب گروه</option>
                                                            {
                                                                groups.length > 0 && groups.map((group) => (
                                                                    <option key={group.id} value={group.id}>
                                                                        {group.name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="group" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-6">
                                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        آدرس تصویر
                                                    </label>
                                                    <div className="mt-1">
                                                        <Field
                                                            type="text"
                                                            id="image"
                                                            name="image"
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        />
                                                        <ErrorMessage name="image" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:rtl:space-x-reverse gap-3 pt-4">
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                                                >
                                                    افزودن مخاطب
                                                </button>
                                                <Link
                                                    to="/contacts"
                                                    className="w-full sm:w-auto flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default AddContact;