.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , -2048 
		addi    x30 , x0 , 26 
		sltu    x28 , x21 , x30 
		bltu    x21 , x30 , Less_i 
		bgeu    x21 , x30 , Bigger_i 
Less_i:
		ori     x6 , x21 , 98 
		sub     x19 , x30 , x21 
		srai    x19 , x19 , 0 
		and     x19 , x19 , x0 
		addi    x20 , x0 , 0 
		beq     x19 , x20 , Pass 
Bigger_i:
		ori     x6 , x21 , 161 
		sub     x19 , x30 , x21 
		srai    x19 , x19 , 4 
		and     x19 , x19 , x0 
		addi    x20 , x0 , 0 
		beq     x19 , x20 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
