"use client";
import { useEffect, useState } from "react";
import { getDecks } from "@/lib/deckApi";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  Category as APICategory,
} from "@/lib/categoryApi";
import { toast } from "sonner";
import { CategoryTable } from "./_components/category-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CategoryForm } from "./_components/category-form";
import { CategoriesChart } from "./_components/chart";
import { Input } from "@/components/ui/input"; // Make sure this import exists!

// UI types for local props
type UIDeck = { id: string; name: string };
type UICategory = Omit<APICategory, "id" | "deck"> & { id: string; deckId: string; deck_name: string };

function kpiCount(arr: UICategory[], fn: (cat: UICategory) => boolean) {
  return arr.filter(fn).length;
}

export default function CategoriesPage() {
  const [decks, setDecks] = useState<UIDeck[]>([]);
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // <-- added search state

  // Fetch decks and categories
  useEffect(() => {
    async function fetchData() {
      try {
        const [decksData, categoriesData] = await Promise.all([getDecks(), getCategories()]);
        setDecks(decksData.map((deck) => ({ id: deck.id.toString(), name: deck.name })));
        setCategories(categoriesData.map((cat) => ({
          ...cat,
          id: cat.id.toString(),
          deckId: cat.deck.toString(),
          deck_name: decksData.find(d => d.id === cat.deck)?.name || 'Unknown Deck'
        })));
      } catch {
        toast.error("Failed to load decks or categories");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Create Category
  const handleCreateCategory = async (data: { name: string; description: string; deckId: string }) => {
    try {
      const newCat = await createCategory({
        name: data.name,
        description: data.description,
        deck: Number(data.deckId),
      });
      setCategories((prev) => [
        {
          ...newCat,
          id: newCat.id.toString(),
          deckId: newCat.deck.toString(),
          deck_name: decks.find(d => d.id === newCat.deck.toString())?.name || 'Unknown Deck'
        },
        ...prev,
      ]);
      toast.success("Category created!");
    } catch {
      toast.error("Failed to create category");
    }
  };

  // Edit Category
  const handleEditCategory = async (id: string, data: { name: string; description: string; deckId: string }) => {
    try {
      const updatedCat = await updateCategory(Number(id), {
        name: data.name,
        description: data.description,
        deck: Number(data.deckId),
      });
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? { ...updatedCat, id: updatedCat.id.toString(), deckId: updatedCat.deck.toString(), deck_name: decks.find(d => d.id === updatedCat.deck.toString())?.name || 'Unknown Deck' }
            : cat
        )
      );
      toast.success("Category updated!");
    } catch {
      toast.error("Failed to update category");
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(Number(id));
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted!");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  // KPI cards content
  const kpis = [
    { title: "Total Categories", value: categories.length, trend: "" },
    { title: "Active Categories", value: kpiCount(categories, c => c.status), trend: "" },
    { title: "Inactive Categories", value: kpiCount(categories, c => !c.status), trend: "" },
    { title: "Growth", value: "12%", trend: "+2%" }, // Dummy value
  ];

  // Search Handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filtered Categories for Table
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="border shadow-sm rounded-xl">
            <CardHeader>
              <CardDescription>{kpi.title}</CardDescription>
              <CardTitle className="text-3xl font-semibold mt-2">
                {kpi.value}
                <span className="ml-2 text-xs font-medium text-green-600">{kpi.trend}</span>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* Chart + Add Category card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chart card (matches Decks) */}
        <Card className="rounded-xl border border-zinc-200 shadow-sm min-h-[240px] flex flex-col justify-center px-6">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium mb-1">Categories Overview</CardTitle>
            <CardDescription className="mb-2">Category creation trend</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-end flex-1">
            <CategoriesChart />
          </CardContent>
        </Card>
        {/* Create Category Form card */}
        <CategoryForm decks={decks} onCreate={handleCreateCategory} />
      </div>
      {/* Table Card */}
      <Card className="border-2 border-zinc-300 shadow rounded-xl mt-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Categories</CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-1 mb-2">
            Manage all categories on your platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search box (now with tight spacing) */}
          <div className="mb-2 flex items-center">
            <Input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={handleSearch}
              className="w-72"
            />
          </div>
          <CategoryTable
            categories={filteredCategories}
            decks={decks}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
