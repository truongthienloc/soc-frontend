.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x22 , 9
		auipc    x16 , 0
		auipc    x8 , 2
		auipc    x1 , 1
		lui      x19 , 1
		lui      x20 , 8
		lui      x4 , 4
		lui      x11 , 1
		sw       x31 , 116 (x22) 
		sw       x12 , 120 (x16) 
		sw       x14 , 124 (x8) 
		sw       x27 , 128 (x1) 
		sw       x21 , 132 (x19) 
		sw       x2 , 136 (x20) 
		sw       x17 , 140 (x4) 
		sw       x26 , 144 (x11) 
		lw       x9 , 144 (x11) 
		lw       x7 , 140 (x4) 
		lw       x10 , 136 (x20) 
		lw       x29 , 132 (x19) 
		lw       x18 , 128 (x1) 
		lw       x30 , 124 (x8) 
		lw       x24 , 120 (x16) 
		lw       x5 , 116 (x22) 
		bne      x5 , x31 , Fail
		bne      x24 , x12 , Fail
		bne      x30 , x14 , Fail
		bne      x18 , x27 , Fail
		bne      x29 , x21 , Fail
		bne      x10 , x2 , Fail
		bne      x7 , x17 , Fail
		bne      x9 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
