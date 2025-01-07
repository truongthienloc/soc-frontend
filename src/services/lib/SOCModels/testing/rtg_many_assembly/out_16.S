.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x23 , 7 
		lui     x14 , 4 
		lui     x6 , 3 
		lui     x4 , 7 
		sb      x16 , 88 (x23) 
		sb      x18 , 88 (x14) 
		sb      x10 , 88 (x6) 
		sb      x15 , 88 (x4) 
		lb      x17 , 88 (x4) 
		lb      x20 , 88 (x6) 
		lb      x21 , 88 (x14) 
		lb      x5 , 88 (x23) 
		bne     x5 , x16 , Fail
		bne     x21 , x18 , Fail
		bne     x20 , x10 , Fail
		bne     x17 , x15 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
