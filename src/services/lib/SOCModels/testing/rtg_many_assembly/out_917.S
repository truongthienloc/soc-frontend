.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x3 , 7 
		lui     x20 , 8 
		lui     x6 , 2 
		lui     x4 , 7 
		sb      x14 , 72 (x3) 
		sb      x13 , 72 (x20) 
		sb      x24 , 72 (x6) 
		sb      x18 , 72 (x4) 
		lb      x12 , 72 (x4) 
		lb      x7 , 72 (x6) 
		lb      x5 , 72 (x20) 
		lb      x19 , 72 (x3) 
		bne     x19 , x14 , Fail
		bne     x5 , x13 , Fail
		bne     x7 , x24 , Fail
		bne     x12 , x18 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
