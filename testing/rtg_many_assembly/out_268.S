.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , -2048 
		addi    x7 , x0 , 147 
		sltu    x18 , x27 , x7 
		bltu    x27 , x7 , Less_i 
		bgeu    x27 , x7 , Bigger_i 
Less_i:
		ori     x1 , x27 , 80 
		sub     x19 , x7 , x27 
		srai    x19 , x19 , 4 
		and     x19 , x19 , x0 
		addi    x9 , x0 , 0 
		beq     x19 , x9 , Pass 
Bigger_i:
		ori     x1 , x27 , 112 
		sub     x19 , x7 , x27 
		srai    x19 , x19 , 4 
		and     x19 , x19 , x0 
		addi    x9 , x0 , 0 
		beq     x19 , x9 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
