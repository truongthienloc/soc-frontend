.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		addi    x15 , x0 , 0 
		addi    x26 , x0 , 0 
		addi    x17 , x0 , 36 
InArr:
		addi    x13 , x0 , 4 
		addi    x19 , x0 , 28 
		addi    x14 , x0 , 72 
		addi    x11 , x0 , 12 
		sh      x13 , 12 (x17) 
		sh      x19 , 16 (x17) 
		sh      x14 , 20 (x17) 
		sh      x11 , 24 (x17) 
Loop:
		slli    x21 , x26 , 2 
		add     x20 , x21 , x17 
		lh      x10 , 12 (x20) 
		add     x15 , x15 , x10 
		addi    x26 , x26 , 1 
		beq     x26 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x5 , x0 , 116 
		bne     x5 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
