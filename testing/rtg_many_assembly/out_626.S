.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 10 
		addi    x13 , x0 , 9 
		sltu    x4 , x29 , x13 
		bltu    x29 , x13 , Less_i 
		bgeu    x29 , x13 , Bigger_i 
Less_i:
		ori     x15 , x29 , 104 
		sub     x10 , x13 , x29 
		srai    x10 , x10 , 1 
		and     x10 , x10 , x0 
		addi    x25 , x0 , 0 
		beq     x10 , x25 , Pass 
Bigger_i:
		ori     x15 , x29 , 109 
		sub     x10 , x13 , x29 
		srai    x10 , x10 , 2 
		and     x10 , x10 , x0 
		addi    x25 , x0 , 0 
		beq     x10 , x25 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
