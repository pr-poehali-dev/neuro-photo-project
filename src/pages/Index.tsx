import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [testStep, setTestStep] = useState(0);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const testQuestions = [
    {
      question: 'Что для вас важнее в фотографии?',
      options: [
        { text: 'Точная передача реалистичных моментов', score: 1 },
        { text: 'Яркие эффекты и необычные образы', score: 3 },
        { text: 'Пока не решил(-а)', score: 2 }
      ]
    },
    {
      question: 'Какой способ съёмки вам больше нравится?',
      options: [
        { text: 'С помощью фотоаппарата и профессионального фотографа', score: 1 },
        { text: 'Использование технологий искусственного интеллекта и цифровых эффектов', score: 3 },
        { text: 'Готов экспериментировать с любыми вариантами', score: 2 }
      ]
    },
    {
      question: 'Как вы относитесь к времени обработки фотографий?',
      options: [
        { text: 'Хочу получить фото быстро, в течение одного-двух дней', score: 1 },
        { text: 'Могу подождать дольше ради качественной и творческой обработки', score: 3 },
        { text: 'Время не имеет значения', score: 2 }
      ]
    },
    {
      question: 'Насколько для вас важен личный контакт с фотографом?',
      options: [
        { text: 'Очень важен, хочу обсудить все детали лично', score: 1 },
        { text: 'Можно ограничиться онлайн общением', score: 3 },
        { text: 'Не принципиально', score: 2 }
      ]
    },
    {
      question: 'Какой результат для вас предпочтительнее?',
      options: [
        { text: 'Естественные снимки без сильной обработки', score: 1 },
        { text: 'Креативные изображения с использованием AI и других технологий', score: 3 },
        { text: 'Готов попробовать разные стили', score: 2 }
      ]
    }
  ];

  const handleTestAnswer = (score: number) => {
    const newAnswers = [...testAnswers, score];
    setTestAnswers(newAnswers);

    if (testStep < testQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      const avgScore = totalScore / newAnswers.length;
      
      if (avgScore <= 1.5) {
        setTestResult('classic');
      } else if (avgScore >= 2.5) {
        setTestResult('neuro');
      } else {
        setTestResult('both');
      }
    }
  };

  const resetTest = () => {
    setTestStep(0);
    setTestAnswers([]);
    setTestResult(null);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
              Alexandra & Maria
            </h1>
            <div className="hidden md:flex gap-8">
              {['home', 'about', 'portfolio', 'services', 'pricing', 'reviews', 'test', 'payment', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О нас'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'services' && 'Услуги'}
                  {section === 'pricing' && 'Прайс'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'test' && 'Тест'}
                  {section === 'payment' && 'Оплата'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-800 to-black bg-clip-text text-transparent">
              Два взгляда на фотографию
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12">
              Классическая фотография и нейрофотография — выберите свой стиль
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('test')}>
                <Icon name="Sparkles" className="mr-2" size={20} />
                Пройти тест
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('portfolio')}>
                <Icon name="Image" className="mr-2" size={20} />
                Портфолио
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in border-purple-100">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/29c45cf4-a1c9-479b-9075-75c077a7c6fe.jpg" 
                  alt="Maria Photography" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">Мария — Классическая фотография</CardTitle>
                <CardDescription className="text-lg">г. Новосибирск</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Профессиональный фотограф с опытом работы более 8 лет. Специализируюсь на портретной, семейной и свадебной фотографии. Работаю в Новосибирске, создавая живые эмоциональные снимки, которые сохранят ваши счастливые моменты навсегда.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary"><Icon name="Camera" size={14} className="mr-1" />Портреты</Badge>
                  <Badge variant="secondary"><Icon name="Users" size={14} className="mr-1" />Семейные</Badge>
                  <Badge variant="secondary"><Icon name="Heart" size={14} className="mr-1" />Свадьбы</Badge>
                  <Badge variant="secondary"><Icon name="MapPin" size={14} className="mr-1" />Новосибирск</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in border-purple-100">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/6ddc559b-8bb2-40b0-a1b9-809beccde798.jpg" 
                  alt="Alexandra Neuro Photography" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">Александра — Нейрофотография</CardTitle>
                <CardDescription className="text-lg">Работаю онлайн</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Нейрофотограф, работающий с искусственным интеллектом и передовыми технологиями. Создаю уникальные художественные портреты с использованием AI. Работаю онлайн со всем миром, превращая ваши идеи в невероятные визуальные образы.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary"><Icon name="Sparkles" size={14} className="mr-1" />AI-портреты</Badge>
                  <Badge variant="secondary"><Icon name="Palette" size={14} className="mr-1" />Арт-обработка</Badge>
                  <Badge variant="secondary"><Icon name="Zap" size={14} className="mr-1" />Нейросети</Badge>
                  <Badge variant="secondary"><Icon name="Globe" size={14} className="mr-1" />Онлайн</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Портфолио
          </h2>
          <Tabs defaultValue="maria" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="maria">Мария</TabsTrigger>
              <TabsTrigger value="alexandra">Александра</TabsTrigger>
            </TabsList>
            <TabsContent value="maria" className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/8f88ee40-5226-411f-97be-ad65d8e98b66.jpg" 
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="alexandra" className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/6ddc559b-8bb2-40b0-a1b9-809beccde798.jpg" 
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Сравнение форматов съёмки
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Camera" className="text-primary" />
                  Классическая фотография
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                    <Icon name="Plus" size={18} />
                    Плюсы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Реалистичная передача эмоций и моментов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Личный контакт с фотографом во время съёмки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Естественное освещение и композиция</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Проверенная временем техника</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Живая атмосфера и спонтанность кадров</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Возможность корректировать позы и ракурсы в реальном времени</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Работа с профессиональным оборудованием и студией</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Подходит для официальных мероприятий и документов</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <Icon name="Minus" size={18} />
                    Минусы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Требуется личное присутствие на съёмке</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Географическая привязка (Новосибирск)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Зависимость от погоды при уличной съёмке</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Более высокая стоимость за счёт оборудования и локации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Требуется время на подготовку (макияж, одежда)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Ограничения по сюжетам и локациям</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Sparkles" className="text-primary" />
                  Нейрофотография
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                    <Icon name="Plus" size={18} />
                    Плюсы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Безграничные творческие возможности и фантазийные сюжеты</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Работа онлайн из любой точки мира</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Уникальные художественные эффекты и стилизации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Быстрая обработка с помощью AI-технологий</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Не требуется выезд, макияж и специальная подготовка</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Можно создать образы, невозможные в реальности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Неограниченное количество локаций и стилей</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Доступнее по цене</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <Icon name="Minus" size={18} />
                    Минусы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Меньше реализма, больше художественной интерпретации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Требуются качественные исходные фото для обработки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Новая технология, не всем привычна и понятна</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Не подходит для официальных документов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Результат может отличаться от ожиданий</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Отсутствие живого контакта с фотографом</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Прайс
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-purple-200 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Классическая фотография</CardTitle>
                <CardDescription>Мария, г. Новосибирск</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Портретная съёмка (1 час)</span>
                  <span className="font-bold">от 5 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Семейная фотосессия (2 часа)</span>
                  <span className="font-bold">от 8 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Свадебная съёмка (полный день)</span>
                  <span className="font-bold">от 25 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Love Story (2 часа)</span>
                  <span className="font-bold">от 7 000 ₽</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">* Включает обработку 30-50 фото в течение 7 дней</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Нейрофотография</CardTitle>
                <CardDescription>Александра, онлайн</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>AI-портрет (5 вариантов)</span>
                  <span className="font-bold">от 3 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Художественная обработка (10 фото)</span>
                  <span className="font-bold">от 5 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Полный нейро-образ (20 фото)</span>
                  <span className="font-bold">от 10 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Концептуальная серия (30 фото)</span>
                  <span className="font-bold">от 15 000 ₽</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">* Работа с вашими фото, обработка 3-5 дней</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Отзывы
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Анна К.', service: 'Классическая съёмка', text: 'Мария — настоящий профессионал! Фотосессия прошла легко и непринуждённо. Результат превзошёл все ожидания. Рекомендую!', rating: 5 },
              { name: 'Дмитрий С.', service: 'Нейрофотография', text: 'Александра создала невероятные AI-портреты! Такого я нигде не видел. Это действительно искусство будущего.', rating: 5 },
              { name: 'Елена М.', service: 'Семейная фотосессия', text: 'Замечательная работа Марии! Она смогла раскрыть всех членов семьи, фотографии получились живыми и искренними.', rating: 5 },
              { name: 'Игорь Л.', service: 'Нейро-образ', text: 'Работа с Александрой онлайн оказалась очень удобной. Результат поразил — фото выглядят как из фантастического фильма!', rating: 5 }
            ].map((review, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.name}</CardTitle>
                      <CardDescription>{review.service}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="test" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Какая съёмка вам подойдёт?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Пройдите тест и узнайте, какой формат фотографии подходит именно вам
          </p>

          <Card className="border-2 border-purple-200">
            <CardContent className="pt-6">
              {testResult === null ? (
                <div className="space-y-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Вопрос {testStep + 1} из {testQuestions.length}</span>
                      <span className="text-sm text-gray-500">{Math.round(((testStep) / testQuestions.length) * 100)}%</span>
                    </div>
                    <Progress value={(testStep / testQuestions.length) * 100} className="h-2" />
                  </div>

                  <h3 className="text-xl font-semibold mb-6">{testQuestions[testStep].question}</h3>

                  <RadioGroup className="space-y-4">
                    {testQuestions[testStep].options.map((option, i) => (
                      <div key={i} className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value={i.toString()} id={`option-${i}`} onClick={() => handleTestAnswer(option.score)} />
                        <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer text-base">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="text-center space-y-6 animate-fade-in">
                  <Icon name="CheckCircle" size={64} className="mx-auto text-primary" />
                  <h3 className="text-2xl font-bold">Результаты теста</h3>
                  
                  {testResult === 'classic' && (
                    <div className="space-y-4">
                      <p className="text-lg">Вам идеально подойдёт <strong className="text-primary">классическая фотография</strong> с Марией!</p>
                      <p className="text-gray-600">
                        Вы цените реализм, живые эмоции и личный контакт. Традиционная фотосессия с профессиональным фотографом — ваш выбор.
                      </p>
                      <Button size="lg" onClick={() => scrollToSection('contacts')}>
                        <Icon name="Camera" className="mr-2" />
                        Связаться с Марией
                      </Button>
                    </div>
                  )}

                  {testResult === 'neuro' && (
                    <div className="space-y-4">
                      <p className="text-lg">Вам идеально подойдёт <strong className="text-primary">нейрофотография</strong> с Александрой!</p>
                      <p className="text-gray-600">
                        Вы открыты новым технологиям и креативу. AI-обработка и художественные эффекты помогут создать уникальные образы.
                      </p>
                      <Button size="lg" onClick={() => scrollToSection('contacts')}>
                        <Icon name="Sparkles" className="mr-2" />
                        Связаться с Александрой
                      </Button>
                    </div>
                  )}

                  {testResult === 'both' && (
                    <div className="space-y-4">
                      <p className="text-lg">Вам подойдут <strong className="text-primary">оба формата</strong> съёмки!</p>
                      <p className="text-gray-600">
                        Вы открыты экспериментам и готовы попробовать разные стили. Рекомендуем начать с классической фотосессии, а затем дополнить её нейрообработкой.
                      </p>
                      <div className="flex gap-4 justify-center flex-wrap">
                        <Button size="lg" onClick={() => scrollToSection('contacts')}>
                          <Icon name="Users" className="mr-2" />
                          Связаться с обеими
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" onClick={resetTest} className="mt-4">
                    <Icon name="RotateCcw" className="mr-2" />
                    Пройти тест заново
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="payment" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Онлайн оплата
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Оплачивайте услуги удобным для вас способом
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="CreditCard" className="text-primary" />
                  Способы оплаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Icon name="CreditCard" className="text-primary" size={24} />
                  <div>
                    <div className="font-semibold">Банковская карта</div>
                    <div className="text-sm text-gray-600">Visa, MasterCard, МИР</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Icon name="Smartphone" className="text-primary" size={24} />
                  <div>
                    <div className="font-semibold">СБП</div>
                    <div className="text-sm text-gray-600">Система быстрых платежей</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Icon name="Wallet" className="text-primary" size={24} />
                  <div>
                    <div className="font-semibold">Электронные кошельки</div>
                    <div className="text-sm text-gray-600">ЮMoney, QIWI</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Icon name="Building" className="text-primary" size={24} />
                  <div>
                    <div className="font-semibold">Банковский перевод</div>
                    <div className="text-sm text-gray-600">По реквизитам</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="ShieldCheck" className="text-primary" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="Lock" className="text-green-500 mt-1" size={20} />
                  <div>
                    <div className="font-semibold mb-1">Защищённые платежи</div>
                    <div className="text-sm text-gray-600">Все транзакции проходят через защищённое соединение SSL</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="FileCheck" className="text-green-500 mt-1" size={20} />
                  <div>
                    <div className="font-semibold mb-1">Договор и чек</div>
                    <div className="text-sm text-gray-600">После оплаты вы получаете договор и фискальный чек</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Undo2" className="text-green-500 mt-1" size={20} />
                  <div>
                    <div className="font-semibold mb-1">Возврат средств</div>
                    <div className="text-sm text-gray-600">Возможность вернуть предоплату в течение 14 дней</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    Для оплаты свяжитесь с фотографом удобным способом. Ссылка на оплату будет выслана после согласования деталей съёмки.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-xl">Условия оплаты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <Icon name="Check" size={18} className="text-primary mt-1" />
                <span>Предоплата 30% для бронирования даты съёмки</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={18} className="text-primary mt-1" />
                <span>Окончательный расчёт после получения готовых фотографий</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={18} className="text-primary mt-1" />
                <span>Возможна рассрочка для крупных заказов (свадьбы, корпоративы)</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={18} className="text-primary mt-1" />
                <span>При отмене съёмки менее чем за 48 часов предоплата не возвращается</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Контакты
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl">Мария</CardTitle>
                <CardDescription>Классическая фотография</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" />
                  <span>г. Новосибирск</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  <a href="tel:+79231234567" className="hover:text-primary transition-colors">+7 (923) 123-45-67</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" />
                  <a href="mailto:maria.photo@example.com" className="hover:text-primary transition-colors">maria.photo@example.com</a>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600">Мессенджеры и соцсети:</p>
                  <a href="https://wa.me/79231234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Icon name="MessageCircle" className="text-primary" />
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://t.me/maria_photo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Icon name="Send" className="text-primary" />
                    <span>Telegram: @maria_photo</span>
                  </a>
                  <a href="https://vk.com/maria_photo_nsk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.48 14.94h-1.39c-.58 0-.76-.47-1.79-1.5-.91-.87-1.31-1-1.53-1-.32 0-.41.09-.41.52v1.37c0 .37-.11.58-1.07.58-1.59 0-3.35-.96-4.59-2.75-1.87-2.59-2.38-4.54-2.38-4.93 0-.22.09-.43.52-.43h1.39c.39 0 .54.18.69.59.76 2.19 2.03 4.11 2.56 4.11.2 0 .29-.09.29-.59v-2.28c-.07-1.13-.65-1.22-.65-1.62 0-.18.15-.36.39-.36h2.18c.33 0 .45.17.45.55v3.08c0 .33.15.45.24.45.2 0 .36-.12.72-.48 1.1-1.24 1.89-3.15 1.89-3.15.11-.22.28-.43.7-.43h1.39c.47 0 .57.24.47.55-.17.78-1.85 3.28-1.85 3.28-.17.27-.23.39 0 .7.17.23.72.71 1.09 1.14.67.77 1.18 1.41 1.32 1.86.13.44-.1.67-.54.67z"/>
                    </svg>
                    <span>ВКонтакте</span>
                  </a>
                  <a href="https://instagram.com/maria_photo_nsk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Icon name="Instagram" className="text-primary" />
                    <span>@maria_photo_nsk</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl">Александра</CardTitle>
                <CardDescription>Нейрофотография</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Globe" className="text-primary" />
                  <span>Работаю онлайн</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  <a href="tel:+79998887766" className="hover:text-primary transition-colors">+7 (999) 888-77-66</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" />
                  <a href="mailto:alexandra.neuro@example.com" className="hover:text-primary transition-colors">alexandra.neuro@example.com</a>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600">Мессенджеры и соцсети:</p>
                  <a href="https://wa.me/79998887766" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Icon name="MessageCircle" className="text-primary" />
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://t.me/alexandra_neuro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Icon name="Send" className="text-primary" />
                    <span>Telegram: @alexandra_neuro</span>
                  </a>
                  <a href="https://vk.com/alexandra_neuro_art" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.48 14.94h-1.39c-.58 0-.76-.47-1.79-1.5-.91-.87-1.31-1-1.53-1-.32 0-.41.09-.41.52v1.37c0 .37-.11.58-1.07.58-1.59 0-3.35-.96-4.59-2.75-1.87-2.59-2.38-4.54-2.38-4.93 0-.22.09-.43.52-.43h1.39c.39 0 .54.18.69.59.76 2.19 2.03 4.11 2.56 4.11.2 0 .29-.09.29-.59v-2.28c-.07-1.13-.65-1.22-.65-1.62 0-.18.15-.36.39-.36h2.18c.33 0 .45.17.45.55v3.08c0 .33.15.45.24.45.2 0 .36-.12.72-.48 1.1-1.24 1.89-3.15 1.89-3.15.11-.22.28-.43.7-.43h1.39c.47 0 .57.24.47.55-.17.78-1.85 3.28-1.85 3.28-.17.27-.23.39 0 .7.17.23.72.71 1.09 1.14.67.77 1.18 1.41 1.32 1.86.13.44-.1.67-.54.67z"/>
                    </svg>
                    <span>ВКонтакте</span>
                  </a>
                  <a href="https://instagram.com/alexandra_neuro_art" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Icon name="Instagram" className="text-primary" />
                    <span>@alexandra_neuro_art</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Alexandra & Maria
          </h3>
          <p className="text-gray-400 mb-4">Два взгляда на фотографию — выберите свой стиль</p>
          <div className="flex justify-center gap-6 mb-6">
            <Icon name="Instagram" className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="Facebook" className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="Youtube" className="cursor-pointer hover:text-primary transition-colors" />
          </div>
          <div className="mb-6">
            <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
              <DialogTrigger asChild>
                <button className="text-sm text-gray-400 hover:text-primary transition-colors underline">
                  Политика конфиденциальности
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Политика конфиденциальности</DialogTitle>
                  <DialogDescription>
                    Последнее обновление: 23 ноября 2024 г.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-gray-700">
                  <section>
                    <h3 className="font-semibold text-base mb-2">1. Общие положения</h3>
                    <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса Alexandra & Maria Photography.</p>
                  </section>
                  
                  <section>
                    <h3 className="font-semibold text-base mb-2">2. Какие данные мы собираем</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ФИО, контактный телефон и email для связи</li>
                      <li>Фотографии, предоставленные для обработки</li>
                      <li>Информацию о предпочтениях и пожеланиях к съёмке</li>
                      <li>Данные об оплате (обрабатываются через защищённые платёжные системы)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">3. Как мы используем данные</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Для выполнения заказов на фотосъёмку и обработку</li>
                      <li>Для связи с клиентами по вопросам заказов</li>
                      <li>Для улучшения качества услуг</li>
                      <li>Для отправки информационных рассылок (с вашего согласия)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">4. Защита данных</h3>
                    <p>Мы применяем современные методы защиты информации, включая шифрование данных при передаче и хранении. Доступ к персональным данным имеют только уполномоченные сотрудники.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">5. Передача данных третьим лицам</h3>
                    <p>Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо для исполнения договора (например, платёжные системы) или требуется по закону.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">6. Использование фотографий</h3>
                    <p>Готовые фотографии могут быть использованы в портфолио и для рекламных целей только с письменного согласия клиента. По умолчанию все работы остаются конфиденциальными.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">7. Ваши права</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Запросить информацию о собранных данных</li>
                      <li>Потребовать исправления неточных данных</li>
                      <li>Запросить удаление персональных данных</li>
                      <li>Отозвать согласие на обработку данных</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">8. Cookies</h3>
                    <p>Наш сайт использует cookie-файлы для улучшения работы и анализа посещаемости. Вы можете отключить cookies в настройках браузера.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">9. Изменения в политике</h3>
                    <p>Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на нашем сайте.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-base mb-2">10. Контакты</h3>
                    <p>По всем вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:</p>
                    <ul className="list-none pl-0 mt-2 space-y-1">
                      <li>Email: privacy@alexandra-maria-photo.com</li>
                      <li>Телефон: +7 (923) 123-45-67</li>
                    </ul>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-gray-500">© 2024 Alexandra & Maria. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;