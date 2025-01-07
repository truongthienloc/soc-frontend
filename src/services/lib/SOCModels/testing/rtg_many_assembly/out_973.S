.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		addi    x18 , x0 , 0 
		addi    x5 , x0 , 0 
		addi    x28 , x0 , 32 
InArr:
		addi    x3 , x0 , 56 
		addi    x20 , x0 , 44 
		addi    x29 , x0 , 36 
		addi    x11 , x0 , 72 
		sh      x3 , 44 (x28) 
		sh      x20 , 48 (x28) 
		sh      x29 , 52 (x28) 
		sh      x11 , 56 (x28) 
Loop:
		slli    x14 , x5 , 2 
		add     x16 , x14 , x28 
		lh      x10 , 44 (x16) 
		add     x18 , x18 , x10 
		addi    x5 , x5 , 1 
		beq     x5 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x26 , x0 , 208 
		bne     x26 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
