.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x24 , 4 
		lui     x27 , 6 
		lui     x14 , 6 
		lui     x5 , 7 
		sb      x8 , 100 (x24) 
		sb      x13 , 100 (x27) 
		sb      x17 , 100 (x14) 
		sb      x29 , 100 (x5) 
		lb      x12 , 100 (x5) 
		lb      x20 , 100 (x14) 
		lb      x16 , 100 (x27) 
		lb      x10 , 100 (x24) 
		bne     x10 , x8 , Fail
		bne     x16 , x13 , Fail
		bne     x20 , x17 , Fail
		bne     x12 , x29 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
