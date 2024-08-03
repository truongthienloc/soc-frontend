.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , -2048 
		addi    x19 , x0 , 187 
		sltu    x31 , x7 , x19 
		bltu    x7 , x19 , Less_i 
		bgeu    x7 , x19 , Bigger_i 
Less_i:
		ori     x10 , x7 , 182 
		sub     x15 , x19 , x7 
		srai    x15 , x15 , 4 
		and     x15 , x15 , x0 
		addi    x21 , x0 , 0 
		beq     x15 , x21 , Pass 
Bigger_i:
		ori     x10 , x7 , 3 
		sub     x15 , x19 , x7 
		srai    x15 , x15 , 2 
		and     x15 , x15 , x0 
		addi    x21 , x0 , 0 
		beq     x15 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
