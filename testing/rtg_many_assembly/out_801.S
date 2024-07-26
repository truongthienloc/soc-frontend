.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		addi    x22 , x0 , 0 
		addi    x10 , x0 , 0 
		addi    x15 , x0 , 8 
InArr:
		addi    x28 , x0 , 48 
		addi    x2 , x0 , 48 
		addi    x11 , x0 , 64 
		addi    x8 , x0 , 0 
		sh      x28 , 72 (x15) 
		sh      x2 , 76 (x15) 
		sh      x11 , 80 (x15) 
		sh      x8 , 84 (x15) 
Loop:
		slli    x31 , x10 , 2 
		add     x6 , x31 , x15 
		lh      x14 , 72 (x6) 
		add     x22 , x22 , x14 
		addi    x10 , x10 , 1 
		beq     x10 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x23 , x0 , 160 
		bne     x23 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
