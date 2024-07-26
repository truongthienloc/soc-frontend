.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		addi    x18 , x0 , 0 
		addi    x6 , x0 , 0 
		addi    x22 , x0 , 76 
InArr:
		addi    x30 , x0 , 24 
		addi    x31 , x0 , 52 
		addi    x5 , x0 , 12 
		addi    x15 , x0 , 72 
		sh      x30 , 16 (x22) 
		sh      x31 , 20 (x22) 
		sh      x5 , 24 (x22) 
		sh      x15 , 28 (x22) 
Loop:
		slli    x17 , x6 , 2 
		add     x29 , x17 , x22 
		lh      x24 , 16 (x29) 
		add     x18 , x18 , x24 
		addi    x6 , x6 , 1 
		beq     x6 , x8 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 160 
		bne     x11 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
