.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x20 , 3 
		lui     x25 , 5 
		lui     x7 , 7 
		lui     x17 , 7 
		sb      x3 , 52 (x20) 
		sb      x14 , 52 (x25) 
		sb      x22 , 52 (x7) 
		sb      x30 , 52 (x17) 
		lb      x8 , 52 (x17) 
		lb      x31 , 52 (x7) 
		lb      x11 , 52 (x25) 
		lb      x15 , 52 (x20) 
		bne     x15 , x3 , Fail
		bne     x11 , x14 , Fail
		bne     x31 , x22 , Fail
		bne     x8 , x30 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
