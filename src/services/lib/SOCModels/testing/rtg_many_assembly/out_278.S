.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x6 , x0 , 4 
		addi    x11 , x0 , 0 
		addi    x19 , x0 , 0 
		addi    x31 , x0 , 56 
InArr:
		addi    x8 , x0 , 20 
		addi    x13 , x0 , 16 
		addi    x2 , x0 , 16 
		addi    x22 , x0 , 20 
		sh      x8 , 40 (x31) 
		sh      x13 , 44 (x31) 
		sh      x2 , 48 (x31) 
		sh      x22 , 52 (x31) 
Loop:
		slli    x10 , x19 , 2 
		add     x14 , x10 , x31 
		lh      x16 , 40 (x14) 
		add     x11 , x11 , x16 
		addi    x19 , x19 , 1 
		beq     x19 , x6 , Result 
		jal     x0 , Loop 
Result:
		addi    x9 , x0 , 72 
		bne     x9 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
