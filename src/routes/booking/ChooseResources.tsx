import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import HeroSection from '@/components/ui/HeroSection';
import Card from '@/components/ui/card';
import { LABELS } from '@/constants/labels';
import { submitReservation } from '@/services/reservationService';
import type { ResourceReservationDTO } from '@/type/resourceReservation';
import type { Reservation, ReservationDTO } from '@/type/reservation';
import type { DeskReservationDTO } from '@/type/deskReservation';
import { createBilling } from '@/services/billingService';
import { useAuth } from '@/contexts/AuthContext';
import type { CartItem, Resource } from '@/type/resource';
import { fetchAllResources } from '@/services/resourceService';

type SortOption = 'price-asc' | 'price-desc' | 'name';

export default function ChooseResources() {
  const { goToBilling } = useBookingFlow();
  const location = useLocation();
  const bookingData = (location.state as {
    location: string;
    fromDate: string;
    toDate: string;
  }) || {
    location: 'Office',
    fromDate: '',
    toDate: '',
  };
  const officeName = bookingData.location;
  const fromDate = bookingData.fromDate;
  const toDate = bookingData.toDate;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    fetchAllResources().then((resources) => {
      // resources
      //   .filter((resource) => {
      //     const matchesSearch =
      //       resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //       resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      //     const matchesCategory =
      //       selectedCategory === 'all' || resource.category === selectedCategory;
      //     return matchesSearch && matchesCategory;
      //   })
      //   .sort((a, b) => {
      //     switch (sortBy) {
      //       case 'price-asc':
      //         return a.price - b.price;
      //       case 'price-desc':
      //         return b.price - a.price;
      //       case 'name':
      //       default:
      //         return a.name.localeCompare(b.name);
      //     }
      //   });
      setFilteredResources(resources);
    });
  }, []);

  const addToCart = (resource: Resource) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === resource.id);
      if (existing) {
        return prev.map((item) =>
          item.id === resource.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...resource, quantity: 1 }];
    });
  };

  const removeFromCart = (resourceId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== resourceId));
  };

  const updateQuantity = (resourceId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(resourceId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === resourceId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirmRequest = () => {
    console.log(user);
    // Submit reservation
    const reservation: ReservationDTO = {
      authUserId: user?.id || '', // empty if no user
      totalPrice: 1, // TODO - calculate total price based on cart
      deskReservation: {
        id: 1, // TODO - fetch actual desk ID
        startDate: new Date(fromDate),
        endDate: new Date(toDate),
      } as DeskReservationDTO,
      resourceReservations: cart.map((item) => ({
        id: item.id, // TODO - implement fetching resource's ID once they are no longer hardcoded
        quantity: item.quantity,
        startDate: new Date(fromDate),
        endDate: new Date(toDate),
      })) as ResourceReservationDTO[],
      description: '',
    };
    // Submit reservation request
    submitReservation(reservation).then((res: Reservation) => {
      // Submit/generate bill
      createBilling(res.id);
      // Redirect to billing page
      goToBilling({
        location: officeName,
        fromDate,
        toDate,
        resources: cart,
      });
    });

    // goToConfirmation({
    //   location: officeName,
    //   fromDate,
    //   toDate,
    //   resources: cart,
    // });
  };

  const getCategoryIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'television':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case 'projector':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        );
      case 'monitor':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      // TODO add more
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title={LABELS.BOOKING.TITLES.AVAILABLE_RESOURCES}
        subtitle={LABELS.BOOKING.DESCRIPTIONS.ADD_RESOURCES}
        breadcrumbs={[
          { label: LABELS.NAVIGATION.HOME },
          { label: LABELS.NAVIGATION.BOOKING },
          { label: officeName },
          { label: LABELS.BOOKING.STEPS.CHOOSE_RESOURCES, active: true },
        ]}
        stepIndicator={{
          icon: (
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          ),
          text: 'Step 3 of 4: Select Resources',
        }}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card
                header={{ title: LABELS.ACTIONS.FILTER }}
                className="sticky top-8"
                padding="md"
              >
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {LABELS.ACTIONS.SEARCH}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={LABELS.FORMS.PLACEHOLDERS.SEARCH}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                      />
                      <svg
                        className="absolute right-3 top-3 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Category
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'All Categories' },
                        { value: 'television', label: 'Televisions' },
                        { value: 'projector', label: 'Projectors' },
                        { value: 'monitor', label: 'Monitors' },
                      ].map((category) => (
                        <label
                          key={category.value}
                          className="flex items-center"
                        >
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={selectedCategory === category.value}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                            className="mr-3 text-gray-900 focus:ring-gray-900"
                          />
                          <span className="text-gray-700">
                            {category.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showAvailableOnly}
                        onChange={(e) => setShowAvailableOnly(e.target.checked)}
                        className="mr-3 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-gray-700">
                        {LABELS.BOOKING.LABELS.AVAILABLE}
                      </span>
                    </label>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                    >
                      <option value="name">Name</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            {/* Resources Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} hover padding="md">
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6 rounded-lg">
                      {getCategoryIcon(resource.type)}
                      {/* {!resource.available && ( */}
                      <div className="absolute top-4 right-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {LABELS.BOOKING.LABELS.UNAVAILABLE}
                      </div>
                      {/* )} */}
                      {/* {resource.available && ( */}
                      <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {LABELS.BOOKING.LABELS.AVAILABLE}
                      </div>
                      {/* )} */}
                    </div>

                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {resource.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {resource.description}
                    </p>

                    {/* <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Specifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.specifications.map((spec, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div> */}

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-light text-gray-900">
                        ${resource.price}
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                      <button
                        onClick={() => addToCart(resource)}
                        // disabled={!resource.available}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          // resource.available ?
                          'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                          // : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {LABELS.ACTIONS.ADD}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {LABELS.STATUS.NO_RESULTS}
                  </h3>
                  <p className="text-gray-600">{LABELS.STATUS.TRY_AGAIN}</p>
                </div>
              )}
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <Card
                header={{
                  title: `${LABELS.BOOKING.LABELS.CART} (${cart.length})`,
                }}
                className="sticky top-8"
                padding="md"
              >
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      className="w-12 h-12 text-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6-5V7a2 2 0 00-2-2H9a2 2 0 00-2-2v5"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">
                      {LABELS.BOOKING.MESSAGES.CART_EMPTY}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-gray-100 pb-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">
                          {LABELS.BOOKING.LABELS.TOTAL}
                        </span>
                        <span className="text-xl font-light text-gray-900">
                          ${getTotalCost().toFixed(2)}/day
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmRequest}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      {LABELS.ACTIONS.CONTINUE}
                    </button>
                  </>
                )}

                {cart.length === 0 && (
                  <button
                    onClick={handleConfirmRequest}
                    className="w-full bg-white text-gray-900 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    {LABELS.BOOKING.MESSAGES.SKIP_RESOURCES}
                  </button>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
