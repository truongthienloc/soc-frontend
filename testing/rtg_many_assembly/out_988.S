.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x29 , 4
		auipc    x22 , 8
		auipc    x24 , 8
		auipc    x4 , 1
		lui      x17 , 7
		lui      x5 , 7
		lui      x10 , 8
		lui      x13 , 4
		sw       x9 , 92 (x29) 
		sw       x20 , 96 (x22) 
		sw       x6 , 100 (x24) 
		sw       x14 , 104 (x4) 
		sw       x8 , 108 (x17) 
		sw       x15 , 112 (x5) 
		sw       x3 , 116 (x10) 
		sw       x25 , 120 (x13) 
		lw       x1 , 120 (x13) 
		lw       x31 , 116 (x10) 
		lw       x30 , 112 (x5) 
		lw       x18 , 108 (x17) 
		lw       x16 , 104 (x4) 
		lw       x2 , 100 (x24) 
		lw       x26 , 96 (x22) 
		lw       x7 , 92 (x29) 
		bne      x7 , x9 , Fail
		bne      x26 , x20 , Fail
		bne      x2 , x6 , Fail
		bne      x16 , x14 , Fail
		bne      x18 , x8 , Fail
		bne      x30 , x15 , Fail
		bne      x31 , x3 , Fail
		bne      x1 , x25 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
