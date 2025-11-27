import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  author: z.string().min(1, '작성자명은 필수입니다'),
  category: z.enum(['', 'development', 'design', 'accessibility']),
  content: z.string(),
});

type Props = {
  data?: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export const PostForm = ({ data, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || '',
      author: data?.author || '',
      category: data?.category || '',
      content: data?.content || '',
    },
  });

  function _onSubmit(value: z.infer<typeof formSchema>) {
    onSubmit(value);
    console.log(value);
  }
  return (
    <Form {...form}>
      <form
        id='post-form'
        onSubmit={form.handleSubmit(_onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className='relative after:absolute after:top-[-3px] after:text-red-500 after:content-["*"]'>
                  제목
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder='게시글 제목을 입력하세요' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full gap-2'>
          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <span className='relative after:absolute after:top-[-3px] after:text-red-500 after:content-["*"]'>
                    작성자
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='작성자명' className='w-full' {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>카테고리</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <NativeSelectOption value=''>
                      카테고리 선택
                    </NativeSelectOption>
                    <NativeSelectOption value='development'>
                      Development
                    </NativeSelectOption>
                    <NativeSelectOption value='design'>
                      Design
                    </NativeSelectOption>
                    <NativeSelectOption value='accessibility'>
                      Accessibility
                    </NativeSelectOption>
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='게시글 내용을 입력하세요'
                  className='min-h-30'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
