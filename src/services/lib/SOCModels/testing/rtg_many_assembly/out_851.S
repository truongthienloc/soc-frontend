.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		add     x21 , x0 , x0 
		add     x19 , x0 , x0 
		addi    x14 , x0 , 32 
		addi    x20 , x0 , 2 
InArr:
		addi    x22 , x0 , 60 
		addi    x1 , x0 , 44 
		addi    x30 , x0 , 8 
		addi    x6 , x0 , 72 
		sh      x22 , 48 (x14) 
		sh      x1 , 52 (x14) 
		sh      x30 , 56 (x14) 
		sh      x6 , 60 (x14) 
Loop:
		sll     x2 , x19 , x20 
		add     x3 , x2 , x14 
		lhu     x11 , 48 (x3) 
		add     x21 , x21 , x11 
		addi    x19 , x19 , 1 
		beq     x19 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x31 , x0 , 184 
		bne     x31 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
