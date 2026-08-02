import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Upload, X } from 'lucide-react';

interface SimpleCategory {
    id: number;
    name: string;
    slug: string;
}

interface SimpleSubCategory {
    id: number;
    name: string;
    category_id: number;
}

interface AdminProductsCreateProps {
    categories: SimpleCategory[];
}

interface PreviewFile {
    file: File;
    previewUrl: string;
}

export default function AdminProductsCreate({ categories }: AdminProductsCreateProps) {
    const [title,               setTitle]               = useState('');
    const [slug,                setSlug]                = useState('');
    const [categoryId,          setCategoryId]          = useState('');
    const [subcategoryId,       setSubcategoryId]       = useState('');
    const [description,         setDescription]         = useState('');
    const [priceOnRequest,      setPriceOnRequest]      = useState(true);
    const [price,               setPrice]               = useState('');
    const [goldPurity,          setGoldPurity]          = useState('');
    const [approxWeight,        setApproxWeight]        = useState('');
    const [stoneInfo,           setStoneInfo]           = useState('');
    const [status,              setStatus]              = useState('available');
    const [customisationOpts,   setCustomisationOpts]   = useState('');
    const [isFeatured,          setIsFeatured]          = useState(false);
    const [isLatestArrival,     setIsLatestArrival]     = useState(false);
    const [sortOrder,           setSortOrder]           = useState(0);
    const [previews,            setPreviews]            = useState<PreviewFile[]>([]);
    const [subcategories,       setSubcategories]       = useState<SimpleSubCategory[]>([]);
    const [processing,          setProcessing]          = useState(false);
    const [errors,              setErrors]              = useState<Record<string, string>>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-generate slug from title
    useEffect(() => {
        setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }, [title]);

    // Fetch subcategories when category changes
    useEffect(() => {
        if (!categoryId) { setSubcategories([]); setSubcategoryId(''); return; }
        fetch(`/admin/subcategories?category_id=${categoryId}&per_page=100`)
            .then(r => r.json())
            .catch(() => null);
        // Simpler approach: filter from server-side data if available, else leave empty
        setSubcategoryId('');
        setSubcategories([]);
        // Fetch dynamically
        router.reload({
            only: [],
        });
    }, [categoryId]);

    const handleFilesChange = (files: FileList | null) => {
        if (!files) return;
        const newPreviews = Array.from(files).map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const removePreview = (index: number) => {
        setPreviews((prev) => {
            URL.revokeObjectURL(prev[index].previewUrl);
            return prev.filter((_, i) => i !== index);
        });
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
        if (goldPurity)       formData.append('gold_purity',           goldPurity);
        if (approxWeight)     formData.append('approximate_weight',    approxWeight);
        if (stoneInfo)        formData.append('stone_info',            stoneInfo);
        formData.append('status',                 status);
        if (customisationOpts) formData.append('customisation_options', customisationOpts);
        formData.append('is_featured',            isFeatured      ? '1' : '0');
        formData.append('is_latest_arrival',      isLatestArrival ? '1' : '0');
        formData.append('sort_order',             String(sortOrder));

        previews.forEach((p) => formData.append('images[]', p.file));

        router.post('/admin/products', formData as any, {
            onError: (errs) => { setErrors(errs); setProcessing(false); },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AdminLayout title="Create Product">
            <Head title="Create Product — Admin" />

            <div className="mb-6">
                <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
                </Link>
                <h2 className="text-2xl font-bold text-white">Create Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Main Fields ── */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Product Details</h3>

                        <div className="space-y-2">
                            <Label htmlFor="title">Product Title *</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. 22K Gold Royal Bridal Set" className="bg-white/5 border-white/10 text-white" />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (auto-generated)</Label>
                            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated-from-title" className="bg-white/5 border-white/10 text-white text-xs font-mono" />
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
                                    <option value="">Select Subcategory</option>
                                    {subcategories.map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed product description..." className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold resize-vertical" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="customisation_options">Customisation Options</Label>
                            <textarea id="customisation_options" rows={2} value={customisationOpts} onChange={(e) => setCustomisationOpts(e.target.value)} placeholder="e.g. Available in 18K or 22K gold, different stone sizes..." className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold resize-vertical" />
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
                                    <option value="N/A">N/A (Diamond / Other)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Approx. Weight</Label>
                                <Input value={approxWeight} onChange={(e) => setApproxWeight(e.target.value)} placeholder="e.g. 32 grams" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Stone Info</Label>
                                <Input value={stoneInfo} onChange={(e) => setStoneInfo(e.target.value)} placeholder="e.g. 1.0ct GIA certified diamond, VVS2, H color" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>
                    </div>
                    {/* Image Manager */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
                            Image Manager
                            <span className="ml-2 text-[10px] normal-case font-normal text-gray-500">(Max 2 Images)</span>
                        </h3>

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

                        <div className="pt-2">
                            <p className="text-xs text-gray-400 mb-3">Upload New Images</p>
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
                                <Input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 350000" className="bg-white/5 border-white/10 text-white" />
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
                                <span className="text-xs text-gray-400">Show in featured products sections</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={isLatestArrival} onChange={(e) => setIsLatestArrival(e.target.checked)} className="w-4 h-4 accent-gold mt-0.5" />
                            <div>
                                <span className="text-sm font-medium text-white block">Latest Arrival</span>
                                <span className="text-xs text-gray-400">Show in "Latest Arrivals" on homepage</span>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button type="submit" disabled={processing} className="w-full bg-gold text-black hover:bg-gold/90 font-bold">
                            {processing ? 'Creating...' : 'Create Product'}
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
