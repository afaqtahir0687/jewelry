import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Upload, X, GripVertical } from 'lucide-react';

interface SimpleCategory {
    id: number;
    name: string;
}

interface SimpleSubCategory {
    id: number;
    name: string;
    category_id: number;
}

interface ExistingImage {
    id: number;
    url: string;
    path: string;
    sort_order: number;
}

interface AdminProduct {
    id: number;
    title: string;
    slug: string;
    category_id: number | null;
    subcategory_id: number | null;
    description: string;
    price_on_request: boolean;
    price: number | null;
    gold_purity: string | null;
    approximate_weight: string | null;
    stone_info: string | null;
    status: string;
    customisation_options: string | null;
    is_featured: boolean;
    is_latest_arrival: boolean;
    sort_order: number;
    product_images: ExistingImage[];
}

interface AdminProductsEditProps {
    product: AdminProduct;
    categories: SimpleCategory[];
    subcategories: SimpleSubCategory[];
}

interface PreviewFile {
    file: File;
    previewUrl: string;
}

export default function AdminProductsEdit({ product, categories, subcategories }: AdminProductsEditProps) {
    const [title,               setTitle]               = useState(product.title);
    const [slug,                setSlug]                = useState(product.slug || '');
    const [categoryId,          setCategoryId]          = useState(String(product.category_id || ''));
    const [subcategoryId,       setSubcategoryId]       = useState(String(product.subcategory_id || ''));
    const [description,         setDescription]         = useState(product.description || '');
    const [priceOnRequest,      setPriceOnRequest]      = useState(product.price_on_request);
    const [price,               setPrice]               = useState(String(product.price || ''));
    const [goldPurity,          setGoldPurity]          = useState(product.gold_purity || '');
    const [approxWeight,        setApproxWeight]        = useState(product.approximate_weight || '');
    const [stoneInfo,           setStoneInfo]           = useState(product.stone_info || '');
    const [status,              setStatus]              = useState(product.status);
    const [customisationOpts,   setCustomisationOpts]   = useState(product.customisation_options || '');
    const [isFeatured,          setIsFeatured]          = useState(product.is_featured);
    const [isLatestArrival,     setIsLatestArrival]     = useState(product.is_latest_arrival);
    const [sortOrder,           setSortOrder]           = useState(product.sort_order);
    const [existingImages,      setExistingImages]      = useState<ExistingImage[]>(product.product_images);
    const [deletedImageIds,     setDeletedImageIds]     = useState<number[]>([]);
    const [newPreviews,         setNewPreviews]         = useState<PreviewFile[]>([]);
    const [processing,          setProcessing]          = useState(false);
    const [errors,              setErrors]              = useState<Record<string, string>>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesChange = (files: FileList | null) => {
        if (!files) return;
        const previews = Array.from(files).map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setNewPreviews((prev) => [...prev, ...previews]);
    };

    const removeNewPreview = (index: number) => {
        setNewPreviews((prev) => {
            URL.revokeObjectURL(prev[index].previewUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

    const markExistingForDelete = (id: number) => {
        setDeletedImageIds((prev) => [...prev, id]);
        setExistingImages((prev) => prev.filter((img) => img.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('title',                  title);
        formData.append('slug',                   slug);
        formData.append('category_id',            categoryId);
        if (subcategoryId) formData.append('subcategory_id', subcategoryId);
        formData.append('description',            description);
        formData.append('price_on_request',       priceOnRequest ? '1' : '0');
        if (!priceOnRequest && price) formData.append('price', price);
        if (goldPurity)      formData.append('gold_purity',            goldPurity);
        if (approxWeight)    formData.append('approximate_weight',     approxWeight);
        if (stoneInfo)       formData.append('stone_info',             stoneInfo);
        formData.append('status',                 status);
        if (customisationOpts) formData.append('customisation_options', customisationOpts);
        formData.append('is_featured',            isFeatured      ? '1' : '0');
        formData.append('is_latest_arrival',      isLatestArrival ? '1' : '0');
        formData.append('sort_order',             String(sortOrder));
        deletedImageIds.forEach((id) => formData.append('deleted_image_ids[]', String(id)));
        newPreviews.forEach((p) => formData.append('images[]', p.file));

        router.post(`/admin/products/${product.id}`, formData as any, {
            onError: (errs) => { setErrors(errs); setProcessing(false); },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AdminLayout title="Edit Product">
            <Head title={`Edit ${product.title} — Admin`} />

            <div className="mb-6">
                <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
                </Link>
                <h2 className="text-2xl font-bold text-white">Edit: <span className="text-gold">{product.title}</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Main Fields ── */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Product Details</h3>

                        <div className="space-y-2">
                            <Label htmlFor="title">Product Title *</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-white/5 border-white/10 text-white" />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-white/5 border-white/10 text-white text-xs font-mono" />
                            {errors.slug && <p className="text-red-400 text-xs">{errors.slug}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold">
                                    <option value="">Select Category</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.category_id && <p className="text-red-400 text-xs">{errors.category_id}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Subcategory</Label>
                                <select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold">
                                    <option value="">None</option>
                                    {subcategories
                                        .filter((sc) => !categoryId || sc.category_id === Number(categoryId))
                                        .map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold resize-vertical" />
                        </div>

                        <div className="space-y-2">
                            <Label>Customisation Options</Label>
                            <textarea rows={2} value={customisationOpts} onChange={(e) => setCustomisationOpts(e.target.value)} placeholder="e.g. Available in different sizes, gold purities..." className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold resize-vertical" />
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Gold Purity</Label>
                                <select value={goldPurity} onChange={(e) => setGoldPurity(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold">
                                    <option value="">Select purity</option>
                                    <option value="22K Gold">22K Gold</option>
                                    <option value="21K Gold">21K Gold</option>
                                    <option value="18K Gold">18K Gold</option>
                                    <option value="18K White Gold">18K White Gold</option>
                                    <option value="Platinum">Platinum</option>
                                    <option value="N/A">N/A</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Approx. Weight</Label>
                                <Input value={approxWeight} onChange={(e) => setApproxWeight(e.target.value)} placeholder="e.g. 32 grams" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Stone Info</Label>
                                <Input value={stoneInfo} onChange={(e) => setStoneInfo(e.target.value)} placeholder="e.g. 1.0ct GIA certified diamond" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Image Manager */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
                            Image Manager
                            <span className="ml-2 text-[10px] normal-case font-normal text-gray-500">(Max 2 Images)</span>
                        </h3>

                        {/* Existing images */}
                        {existingImages.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-400 mb-2">Current Images</p>
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                                    {existingImages.map((img, idx) => (
                                        <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                                            <img src={img.url} alt={`product-img-${img.id}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button type="button" onClick={() => markExistingForDelete(img.id)} className="text-white hover:text-red-400 transition-colors" title="Remove image">
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            {idx === 0 && <span className="absolute bottom-2 left-2 bg-gold text-black text-xs font-bold px-2 py-0.5 rounded">Primary Image</span>}
                                            {idx === 1 && <span className="absolute bottom-2 left-2 bg-white/80 text-black text-xs font-bold px-2 py-0.5 rounded">Hover Image</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New image upload zone - explicit 2 options */}
                        <div className="pt-2">
                            <p className="text-xs text-gray-400 mb-3">Upload New Images (These will append to existing)</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                                    <Label className="block mb-2 text-gold">1. Upload Primary Image</Label>
                                    <input 
                                        type="file" 
                                        accept="image/jpeg,image/png,image/webp" 
                                        className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-black hover:file:bg-gold/90 w-full"
                                        onChange={(e) => handleFilesChange(e.target.files)} 
                                    />
                                </div>
                                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                                    <Label className="block mb-2 text-white">2. Upload Hover Image</Label>
                                    <input 
                                        type="file" 
                                        accept="image/jpeg,image/png,image/webp" 
                                        className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 w-full"
                                        onChange={(e) => handleFilesChange(e.target.files)} 
                                    />
                                </div>
                            </div>
                        </div>

                        {newPreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-400 mb-2">New Previews</p>
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                                    {newPreviews.map((p, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gold/30">
                                            <img src={p.previewUrl} alt={`new-${idx}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button type="button" onClick={() => removeNewPreview(idx)} className="text-white hover:text-red-400">
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <span className="absolute top-2 right-2 bg-gold/80 text-black text-[10px] font-bold px-2 rounded">New</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <div className="space-y-5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Pricing & Status</h3>

                        <div className="space-y-2">
                            <Label>Availability Status</Label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold">
                                <option value="available">Available in Stock</option>
                                <option value="made_to_order">Made to Order</option>
                                <option value="design_inspiration">Design Inspiration</option>
                            </select>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={priceOnRequest} onChange={(e) => setPriceOnRequest(e.target.checked)} className="w-4 h-4 accent-gold" />
                            <span className="text-sm text-white">Price on Request</span>
                        </label>

                        {!priceOnRequest && (
                            <div className="space-y-2">
                                <Label>Price (PKR)</Label>
                                <Input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                                {errors.price && <p className="text-red-400 text-xs">{errors.price}</p>}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Sort Order</Label>
                            <Input type="number" min={0} value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="bg-white/5 border-white/10 text-white w-24" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Visibility</h3>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-gold mt-0.5" />
                            <div>
                                <span className="text-sm font-medium text-white block">Featured</span>
                                <span className="text-xs text-gray-400">Show in featured product sections</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={isLatestArrival} onChange={(e) => setIsLatestArrival(e.target.checked)} className="w-4 h-4 accent-gold mt-0.5" />
                            <div>
                                <span className="text-sm font-medium text-white block">Latest Arrival</span>
                                <span className="text-xs text-gray-400">Show in "Latest Arrivals" homepage section</span>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button type="submit" disabled={processing} className="w-full bg-gold text-black hover:bg-gold/90 font-bold">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Link href="/admin/products" className="w-full">
                            <Button type="button" variant="outline" className="w-full border-white/10 text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </div>

            </form>
        </AdminLayout>
    );
}
