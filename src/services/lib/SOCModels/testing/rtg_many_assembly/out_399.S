.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 148 
		addi    x15 , x0 , 147 
		sltu    x5 , x3 , x15 
		bltu    x3 , x15 , Less_i 
		bgeu    x3 , x15 , Bigger_i 
Less_i:
		ori     x19 , x3 , 6 
		sub     x10 , x15 , x3 
		srai    x10 , x10 , 4 
		and     x10 , x10 , x0 
		addi    x17 , x0 , 0 
		beq     x10 , x17 , Pass 
Bigger_i:
		ori     x19 , x3 , 40 
		sub     x10 , x15 , x3 
		srai    x10 , x10 , 4 
		and     x10 , x10 , x0 
		addi    x17 , x0 , 0 
		beq     x10 , x17 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
