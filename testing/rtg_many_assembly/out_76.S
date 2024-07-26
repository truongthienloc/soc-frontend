.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x5 , 3 
		lui     x14 , 6 
		lui     x15 , 9 
		lui     x6 , 0 
		sb      x21 , 28 (x5) 
		sb      x23 , 28 (x14) 
		sb      x12 , 28 (x15) 
		sb      x4 , 28 (x6) 
		lb      x19 , 28 (x6) 
		lb      x9 , 28 (x15) 
		lb      x20 , 28 (x14) 
		lb      x26 , 28 (x5) 
		bne     x26 , x21 , Fail
		bne     x20 , x23 , Fail
		bne     x9 , x12 , Fail
		bne     x19 , x4 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
