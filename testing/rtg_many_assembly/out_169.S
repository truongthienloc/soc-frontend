.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , -2048 
		addi    x6 , x0 , 178 
		sltu    x30 , x17 , x6 
		bltu    x17 , x6 , Less_i 
		bgeu    x17 , x6 , Bigger_i 
Less_i:
		ori     x14 , x17 , 187 
		sub     x28 , x6 , x17 
		srai    x28 , x28 , 0 
		and     x28 , x28 , x0 
		addi    x13 , x0 , 0 
		beq     x28 , x13 , Pass 
Bigger_i:
		ori     x14 , x17 , 144 
		sub     x28 , x6 , x17 
		srai    x28 , x28 , 0 
		and     x28 , x28 , x0 
		addi    x13 , x0 , 0 
		beq     x28 , x13 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
