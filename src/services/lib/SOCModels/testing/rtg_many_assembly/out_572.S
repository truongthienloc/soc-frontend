.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , -2048 
		addi    x16 , x0 , 118 
		sltu    x5 , x31 , x16 
		bltu    x31 , x16 , Less_i 
		bgeu    x31 , x16 , Bigger_i 
Less_i:
		ori     x10 , x31 , 3 
		sub     x19 , x16 , x31 
		srai    x19 , x19 , 1 
		and     x19 , x19 , x0 
		addi    x6 , x0 , 0 
		beq     x19 , x6 , Pass 
Bigger_i:
		ori     x10 , x31 , 33 
		sub     x19 , x16 , x31 
		srai    x19 , x19 , 1 
		and     x19 , x19 , x0 
		addi    x6 , x0 , 0 
		beq     x19 , x6 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
