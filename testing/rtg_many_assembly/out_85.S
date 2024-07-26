.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		addi    x18 , x0 , 0 
		addi    x24 , x0 , 0 
		addi    x12 , x0 , 32 
InArr:
		addi    x27 , x0 , 60 
		addi    x15 , x0 , 12 
		addi    x2 , x0 , 68 
		addi    x30 , x0 , 0 
		sh      x27 , 16 (x12) 
		sh      x15 , 20 (x12) 
		sh      x2 , 24 (x12) 
		sh      x30 , 28 (x12) 
Loop:
		slli    x23 , x24 , 2 
		add     x21 , x23 , x12 
		lh      x11 , 16 (x21) 
		add     x18 , x18 , x11 
		addi    x24 , x24 , 1 
		beq     x24 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x10 , x0 , 140 
		bne     x10 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
