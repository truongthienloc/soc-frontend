.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x31 , 4 // 0
		lui     x5 , 7 // 4
		lui     x27 , 1 // 8
		lui     x29 , 3 // 12
		sb      x19 , 56 (x31) // 16 
		sb      x4 , 56 (x5)  // 20
		sb      x24 , 56 (x27) // 24
		sb      x18 , 56 (x29) // 28
		lb      x20 , 56 (x29) // 32
		lb      x7 , 56 (x27) // 36
		lb      x28 , 56 (x5) // 40
		lb      x2 , 56 (x31) // 44
		bne     x2 , x19 , Fail // 48
		bne     x28 , x4 , Fail // 52
		bne     x7 , x24 , Fail // 56
		bne     x20 , x18 , Fail // 60
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
